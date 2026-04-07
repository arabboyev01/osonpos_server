import { BaseConfigService } from '../services/base-config.service';
import { CreateBaseConfigDto, UpdateBaseConfigDto } from '../dto/base-config.dto';
export declare class BaseConfigController {
    private readonly baseConfigService;
    constructor(baseConfigService: BaseConfigService);
    create(req: any, dto: CreateBaseConfigDto): Promise<{
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        key_name: string;
        key_value: string;
    }>;
    findAll(req: any): Promise<{
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        key_name: string;
        key_value: string;
    }[]>;
    findByKey(req: any, key: string): Promise<{
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        key_name: string;
        key_value: string;
    }>;
    findOne(req: any, id: string): Promise<{
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        key_name: string;
        key_value: string;
    }>;
    update(req: any, id: string, dto: UpdateBaseConfigDto): Promise<{
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        key_name: string;
        key_value: string;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        key_name: string;
        key_value: string;
    }>;
}
