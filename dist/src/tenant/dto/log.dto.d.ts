import { S_Logs_Type } from '@prisma/client';
export declare class CreateLogDto {
    user_id?: string;
    type: S_Logs_Type;
    action: string;
    details?: string;
}
export declare class QueryLogDto {
    user_id?: string;
    type?: S_Logs_Type;
    action?: string;
    from_date?: string;
    to_date?: string;
    limit?: string;
    offset?: string;
}
