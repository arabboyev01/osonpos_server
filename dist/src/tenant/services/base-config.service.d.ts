import { TenantService } from '../tenant.service';
import { CreateBaseConfigDto, UpdateBaseConfigDto } from '../dto/base-config.dto';
export declare class BaseConfigService {
    private tenantService;
    constructor(tenantService: TenantService);
    create(dbName: string, dto: CreateBaseConfigDto): Promise<{
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        key_name: string;
        key_value: string;
    }>;
    findAll(dbName: string): Promise<{
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        key_name: string;
        key_value: string;
    }[]>;
    findOne(dbName: string, id: string): Promise<{
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        key_name: string;
        key_value: string;
    }>;
    findByKey(dbName: string, key: string): Promise<{
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        key_name: string;
        key_value: string;
    }>;
    update(dbName: string, id: string, dto: UpdateBaseConfigDto): Promise<{
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        key_name: string;
        key_value: string;
    }>;
    remove(dbName: string, id: string): Promise<{
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        key_name: string;
        key_value: string;
    }>;
}
