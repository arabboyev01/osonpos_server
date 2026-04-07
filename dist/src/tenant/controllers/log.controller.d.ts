import { LogService } from '../services/log.service';
import { CreateLogDto, QueryLogDto } from '../dto/log.dto';
export declare class LogController {
    private readonly logService;
    constructor(logService: LogService);
    create(req: any, dto: CreateLogDto): Promise<{
        id: string;
        details: string | null;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        type: import("@prisma/client").$Enums.S_Logs_Type;
        user_id: string | null;
        action: string;
    }>;
    findAll(req: any, query: QueryLogDto): Promise<{
        id: string;
        details: string | null;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        type: import("@prisma/client").$Enums.S_Logs_Type;
        user_id: string | null;
        action: string;
    }[]>;
}
