import { TenantService } from '../tenant.service';
import { CreateLogDto, QueryLogDto } from '../dto/log.dto';
export declare class LogService {
    private tenantService;
    constructor(tenantService: TenantService);
    create(dbName: string, dto: CreateLogDto): Promise<{
        id: string;
        details: string | null;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        type: import("@prisma/client").$Enums.S_Logs_Type;
        user_id: string | null;
        action: string;
    }>;
    recordLog(dbName: string, userId: string, type: string, action: string, details: any): Promise<{
        id: string;
        details: string | null;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        type: import("@prisma/client").$Enums.S_Logs_Type;
        user_id: string | null;
        action: string;
    }>;
    findAll(dbName: string, query?: QueryLogDto): Promise<{
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
