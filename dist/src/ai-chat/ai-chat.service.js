"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AiChatService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiChatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("@nestjs/config");
const generative_ai_1 = require("@google/generative-ai");
let AiChatService = AiChatService_1 = class AiChatService {
    prisma;
    config;
    logger = new common_1.Logger(AiChatService_1.name);
    genAI;
    model;
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
        const apiKey = this.config.get('GEMINI_API_KEY');
        if (apiKey) {
            this.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
            this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        }
        else {
            this.logger.warn('GEMINI_API_KEY is not set in environment variables');
        }
    }
    async createSession(dbName, name) {
        const tenantPrisma = await this.prisma.getTenantClient(dbName);
        return tenantPrisma.chat_Session.create({
            data: {
                name: name,
            },
        });
    }
    async getSessions(dbName) {
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
    async getHistory(dbName, sessionId) {
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
    async updateSession(dbName, id, name) {
        const tenantPrisma = await this.prisma.getTenantClient(dbName);
        return tenantPrisma.chat_Session.update({
            where: { id },
            data: { name },
        });
    }
    async deleteSession(dbName, id) {
        const tenantPrisma = await this.prisma.getTenantClient(dbName);
        return tenantPrisma.chat_Session.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
    async updateHistory(dbName, id, message) {
        const tenantPrisma = await this.prisma.getTenantClient(dbName);
        return tenantPrisma.chat_History.update({
            where: { id },
            data: { message },
        });
    }
    async deleteHistory(dbName, id) {
        const tenantPrisma = await this.prisma.getTenantClient(dbName);
        return tenantPrisma.chat_History.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
    getDatabaseSchemaInfo() {
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
    async *generateStreamResponse(dbName, sessionId, message) {
        if (!this.model) {
            throw new Error('AI Service not initialized. Please set GEMINI_API_KEY.');
        }
        const tenantPrisma = await this.prisma.getTenantClient(dbName);
        await tenantPrisma.chat_History.create({
            data: {
                session_id: sessionId,
                role: 'user',
                message: message,
            },
        });
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
        const sqlMatch = aiResponse.match(/<sql>([\s\S]*?)<\/sql>/);
        if (sqlMatch) {
            const sql = sqlMatch[1].trim();
            this.logger.log(`Executing SQL: ${sql}`);
            try {
                const data = await tenantPrisma.$queryRawUnsafe(sql);
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
                await tenantPrisma.chat_History.create({
                    data: {
                        session_id: sessionId,
                        role: 'model',
                        message: completedResponse,
                    },
                });
            }
            catch (err) {
                this.logger.error('SQL Execution failed', err);
                const errorMsg = "I attempted to query the database but encountered an error. Please refine your question.";
                yield errorMsg;
                await tenantPrisma.chat_History.create({
                    data: { session_id: sessionId, role: 'model', message: errorMsg },
                });
            }
        }
        else {
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
};
exports.AiChatService = AiChatService;
exports.AiChatService = AiChatService = AiChatService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], AiChatService);
//# sourceMappingURL=ai-chat.service.js.map