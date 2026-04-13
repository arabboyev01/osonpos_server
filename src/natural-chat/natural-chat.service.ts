import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NaturalChatService {
  private readonly logger = new Logger(NaturalChatService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createSession(
    dbName: string,
    chatType: 'CHAT' | 'GROUP',
    employeeIds: string[],
    name?: string,
  ) {
    const tenantPrisma = await this.prisma.getTenantClient(dbName);

    return tenantPrisma.natural_Chat_Session.create({
      data: {
        chat_type: chatType,
        name: name,
        naturalChatParticipiants: {
          create: employeeIds.map((id) => ({ employee_id: id })),
        },
      },
      include: {
        naturalChatParticipiants: true,
      },
    });
  }

  async getSessions(dbName: string, employeeId: string) {
    const tenantPrisma = await this.prisma.getTenantClient(dbName);

    return tenantPrisma.natural_Chat_Session.findMany({
      where: {
        is_deleted: false,
        naturalChatParticipiants: {
          some: {
            employee_id: employeeId,
          },
        },
      },
      include: {
        naturalChatParticipiants: true,
        naturalChatHistories: {
          take: 1,
          orderBy: {
            dt_created: 'desc',
          },
        },
      },
      orderBy: {
        dt_updated: 'desc',
      },
    });
  }

  async getHistory(dbName: string, sessionId: string) {
    const tenantPrisma = await this.prisma.getTenantClient(dbName);

    return tenantPrisma.natural_Chat_History.findMany({
      where: {
        session_id: sessionId,
        is_deleted: false,
      },
      orderBy: {
        dt_created: 'asc',
      },
    });
  }

  async saveMessage(
    dbName: string,
    sessionId: string,
    employeeId: string,
    message: string,
  ) {
    const tenantPrisma = await this.prisma.getTenantClient(dbName);

    const history = await tenantPrisma.natural_Chat_History.create({
      data: {
        session_id: sessionId,
        employee_id: employeeId,
        message: message,
      },
    });

    // Update session timestamp
    await tenantPrisma.natural_Chat_Session.update({
      where: { id: sessionId },
      data: { dt_updated: new Date() },
    });

    return history;
  }

  async getEmployees(dbName: string) {
    const tenantPrisma = await this.prisma.getTenantClient(dbName);
    return tenantPrisma.s_Employee.findMany({
      where: { is_deleted: false },
      select: {
        id: true,
        full_name: true,
        phone_number: true,
        email: true,
        employee_address: true,
        notes: true,
      },
    });
  }
}
