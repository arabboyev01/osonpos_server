import { TenantService } from '../tenant.service';
import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from '../dto/payment-method.dto';
import { LogService } from './log.service';
export declare class PaymentMethodService {
    private tenantService;
    private logService;
    constructor(tenantService: TenantService, logService: LogService);
    create(dbName: string, userId: string, dto: CreatePaymentMethodDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
    }>;
    seedDefaults(dbName: string): Promise<void>;
    findAll(dbName: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
    }[]>;
    findOne(dbName: string, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
    } | null>;
    update(dbName: string, userId: string, id: string, dto: UpdatePaymentMethodDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
    }>;
    remove(dbName: string, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
    }>;
}
