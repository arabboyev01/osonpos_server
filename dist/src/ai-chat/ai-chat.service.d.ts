import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
export declare class AiChatService {
    private readonly prisma;
    private readonly config;
    private readonly logger;
    private genAI;
    private model;
    constructor(prisma: PrismaService, config: ConfigService);
    createSession(dbName: string, name: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
    }>;
    getSessions(dbName: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
    }[]>;
    getHistory(dbName: string, sessionId: string): Promise<{
        role: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        message: string;
        session_id: string;
    }[]>;
    updateSession(dbName: string, id: string, name: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
    }>;
    deleteSession(dbName: string, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
    }>;
    updateHistory(dbName: string, id: string, message: string): Promise<{
        role: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        message: string;
        session_id: string;
    }>;
    deleteHistory(dbName: string, id: string): Promise<{
        role: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        message: string;
        session_id: string;
    }>;
    private getDatabaseSchemaInfo;
    generateStreamResponse(dbName: string, sessionId: string, message: string): AsyncGenerator<string, void, unknown>;
}
