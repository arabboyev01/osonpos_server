import { TenantService } from '../tenant.service';
import { CreateSettlmentDto, UpdateSettlmentDto } from '../dto/settlment.dto';
import { LogService } from './log.service';
export declare class SettlmentService {
    private tenantService;
    private logService;
    constructor(tenantService: TenantService, logService: LogService);
    create(dbName: string, userId: string, dto: CreateSettlmentDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        dt_closed: Date | null;
        is_closed: boolean;
    }>;
    findAll(dbName: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        dt_closed: Date | null;
        is_closed: boolean;
    }[]>;
    findOne(dbName: string, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        dt_closed: Date | null;
        is_closed: boolean;
    }>;
    findLatest(dbName: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        dt_closed: Date | null;
        is_closed: boolean;
    } | null>;
    update(dbName: string, userId: string, id: string, dto: UpdateSettlmentDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        dt_closed: Date | null;
        is_closed: boolean;
    }>;
    remove(dbName: string, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        dt_closed: Date | null;
        is_closed: boolean;
    }>;
}
