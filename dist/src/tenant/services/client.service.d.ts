import { TenantService } from '../tenant.service';
import { CreateClientDto, UpdateClientDto } from '../dto/client.dto';
import { LogService } from './log.service';
export declare class ClientService {
    private tenantService;
    private logService;
    constructor(tenantService: TenantService, logService: LogService);
    create(dbName: string, userId: string, dto: CreateClientDto): Promise<{
        address: string | null;
        full_name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        email: string | null;
        phone_number: string | null;
        birthday: Date | null;
    }>;
    findAll(dbName: string): Promise<{
        address: string | null;
        full_name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        email: string | null;
        phone_number: string | null;
        birthday: Date | null;
    }[]>;
    findOne(dbName: string, id: string): Promise<{
        address: string | null;
        full_name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        email: string | null;
        phone_number: string | null;
        birthday: Date | null;
    }>;
    update(dbName: string, userId: string, id: string, dto: UpdateClientDto): Promise<{
        address: string | null;
        full_name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        email: string | null;
        phone_number: string | null;
        birthday: Date | null;
    }>;
    private transformDate;
    remove(dbName: string, id: string): Promise<{
        address: string | null;
        full_name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        email: string | null;
        phone_number: string | null;
        birthday: Date | null;
    }>;
}
