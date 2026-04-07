import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

@Injectable()
export class AiChatService {
  private readonly logger = new Logger(AiChatService.name);
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    const apiKey = this.config.get<string>('GEMINI_API_KEY');
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    } else {
      this.logger.warn('GEMINI_API_KEY is not set in environment variables');
    }
  }

  async createSession(dbName: string, name: string) {
    const tenantPrisma = await this.prisma.getTenantClient(dbName);
    return tenantPrisma.chat_Session.create({
      data: {
        name: name,
      },
    });
  }

  async getSessions(dbName: string) {
    const tenantPrisma = await this.prisma.getTenantClient(dbName);
    return tenantPrisma.chat_Session.findMany({
      where: {
        is_deleted: false,
      },
      orderBy: {
        dt_created: 'desc',
      },
    });
  }

  async getHistory(dbName: string, sessionId: string) {
    const tenantPrisma = await this.prisma.getTenantClient(dbName);
    const session = await tenantPrisma.chat_Session.findFirst({
      where: {
        id: sessionId,
        is_deleted: false,
      },
    });

    if (!session) {
      throw new Error('Session not found');
    }

    return tenantPrisma.chat_History.findMany({
      where: {
        session_id: sessionId,
        is_deleted: false,
      },
      orderBy: {
        dt_created: 'asc',
      },
    });
  }

  async updateSession(dbName: string, id: string, name: string) {
    const tenantPrisma = await this.prisma.getTenantClient(dbName);
    return tenantPrisma.chat_Session.update({
      where: { id },
      data: { name },
    });
  }

  async deleteSession(dbName: string, id: string) {
    const tenantPrisma = await this.prisma.getTenantClient(dbName);
    return tenantPrisma.chat_Session.update({
      where: { id },
      data: { is_deleted: true },
    });
  }

  async updateHistory(dbName: string, id: string, message: string) {
    const tenantPrisma = await this.prisma.getTenantClient(dbName);
    return tenantPrisma.chat_History.update({
      where: { id },
      data: { message },
    });
  }

  async deleteHistory(dbName: string, id: string) {
    const tenantPrisma = await this.prisma.getTenantClient(dbName);
    return tenantPrisma.chat_History.update({
      where: { id },
      data: { is_deleted: true },
    });
  }

  private getDatabaseSchemaInfo() {
    return `
      TABLES (Use double quotes for table names exactly as shown):
      - "D_Order": order sales. Columns: id, order_id, subtotal, total_sum, total_discount, total_tax, employee_id, client_id, dt_created, is_closed, is_voided, is_refunded.
      - "T_Order_Item": items within orders. Columns: id, order_id, item_id, quantity, price, subtotal, dt_created.
      - "S_Item": menu/products info. Columns: id, name, measurement, price, cost, type, id_automated_point.
      - "S_Clients": customer database. Columns: id, full_name, phone_number, email.
      - "S_Employee": staff members. Columns: id, full_name, role_id.
      - "S_Stock_List": inventory levels. Columns: itemId, stock_quantity, price, warehouseId.
      - "S_Warehouse": storage locations. Columns: id, name.

      CRITICAL RULES for SQL:
      1. All numeric fields (total_sum, price, quantity, cost, etc.) are stored as String. You MUST use CAST(field AS DECIMAL) for math.
      2. Filter out deleted records using "is_deleted = false" where applicable.
      3. Use PostgreSQL syntax.
      4. Only use SELECT queries. NEVER perform INSERT, UPDATE, or DELETE.
      5. "Profit" = (CAST("T_Order_Item".price AS DECIMAL) - CAST("S_Item".cost AS DECIMAL)) * CAST("T_Order_Item".quantity AS DECIMAL).
      6. Table names MUST be double-quoted (e.g., SELECT * FROM "D_Order") because they are case-sensitive.
      7. Join "T_Order_Item" with "S_Item" on item_id = "S_Item".id.
      8. Join "T_Order_Item" with "D_Order" on "T_Order_Item".order_id = "D_Order".id.
    `;
  }

  async *generateStreamResponse(dbName: string, sessionId: string, message: string) {
    if (!this.model) {
      throw new Error('AI Service not initialized. Please set GEMINI_API_KEY.');
    }

    const tenantPrisma = await this.prisma.getTenantClient(dbName);

    // 1. Save user message
    await tenantPrisma.chat_History.create({
      data: {
        session_id: sessionId,
        role: 'user',
        message: message,
      },
    });

    // 2. System Prompt
    const schema = this.getDatabaseSchemaInfo();
    const systemPrompt = `
      You are OsonPOS AI, a financial analyst and business advisor. 
      You have access to the business database via SQL.
      Current Time: ${new Date().toISOString()}
      ${schema}
      Analytical Layer:
      - Variance (V) = ((CurrentValue - PreviousValue) / PreviousValue) * 100.
      - Use these formulas to provide professional financial insights.

      If the user asks a question that requires data (e.g., "sales today", "most popular item", "top customers"), generate a SQL query.
      Return ONLY the SQL query wrapped in <sql>...</sql> tags.
      If no SQL is needed, respond directly with advice or insights.
    `;

    const chat = this.model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: "Understood. I will help you with insights and SQL queries." }] },
      ],
    });

    const result = await chat.sendMessage(message);
    let aiResponse = result.response.text();

    // 3. Handle SQL Execution
    const sqlMatch = aiResponse.match(/<sql>([\s\S]*?)<\/sql>/);
    if (sqlMatch) {
      const sql = sqlMatch[1].trim();
      this.logger.log(`Executing SQL: ${sql}`);
      
      try {
        // Cast query results to JSON
        const data = await tenantPrisma.$queryRawUnsafe(sql);
        
        // 4. Final analysis with data (Streaming)
        const analysisPrompt = `
          The user asked: ${message}
          The database returned the following data: ${JSON.stringify(data)}

          Provide a professional business insight based on this data. 
          Use markdown tables if helpful. 
          Include Variance if the user is comparing periods.
          Keep it concise and actionable.
        `;
        const streamResult = await chat.sendMessageStream(analysisPrompt);
        let completedResponse = '';
        for await (const chunk of streamResult.stream) {
          const chunkText = chunk.text();
          completedResponse += chunkText;
          yield chunkText;
        }

        // 5. Save AI completed response
        await tenantPrisma.chat_History.create({
          data: {
            session_id: sessionId,
            role: 'model',
            message: completedResponse,
          },
        });
      } catch (err) {
        this.logger.error('SQL Execution failed', err);
        const errorMsg = "I attempted to query the database but encountered an error. Please refine your question.";
        yield errorMsg;
        await tenantPrisma.chat_History.create({
          data: { session_id: sessionId, role: 'model', message: errorMsg },
        });
      }
    } else {
      // Direct response (non-SQL)
      yield aiResponse;
      await tenantPrisma.chat_History.create({
        data: {
          session_id: sessionId,
          role: 'model',
          message: aiResponse,
        },
      });
    }
  }
}
