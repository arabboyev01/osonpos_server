import { AiChatService } from './ai-chat.service';
import * as express from 'express';
export declare class AiChatController {
    private readonly aiChatService;
    constructor(aiChatService: AiChatService);
    createSession(req: any, body: {
        name: string;
    }): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
    }>;
    getSessions(req: any): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
    }[]>;
    getHistory(req: any, sessionId: string): Promise<{
        role: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        message: string;
        session_id: string;
    }[]>;
    updateSession(req: any, id: string, body: {
        name: string;
    }): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
    }>;
    deleteSession(req: any, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
    }>;
    updateHistory(req: any, id: string, body: {
        message: string;
    }): Promise<{
        role: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        message: string;
        session_id: string;
    }>;
    deleteHistory(req: any, id: string): Promise<{
        role: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        message: string;
        session_id: string;
    }>;
    sendMessage(req: any, body: {
        session_id: string;
        message: string;
    }, res: express.Response): Promise<void>;
}
