import { TenantService } from '../tenant.service';
import { CreateTaxFeeDto, UpdateTaxFeeDto, CreateDiscountDto, UpdateDiscountDto } from '../dto/finance.dto';
import { LogService } from './log.service';
export declare class FinanceService {
    private tenantService;
    private logService;
    constructor(tenantService: TenantService, logService: LogService);
    createTaxFee(dbName: string, userId: string, dto: CreateTaxFeeDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        id_automated_point: string | null;
        tax_percent: string | null;
        tax_value: string | null;
        fee_percent: string | null;
        fee_value: string | null;
    }>;
    findAllTaxFees(dbName: string, workplaceId?: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        id_automated_point: string | null;
        tax_percent: string | null;
        tax_value: string | null;
        fee_percent: string | null;
        fee_value: string | null;
    }[]>;
    findOneTaxFee(dbName: string, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        id_automated_point: string | null;
        tax_percent: string | null;
        tax_value: string | null;
        fee_percent: string | null;
        fee_value: string | null;
    } | null>;
    updateTaxFee(dbName: string, userId: string, id: string, dto: UpdateTaxFeeDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        id_automated_point: string | null;
        tax_percent: string | null;
        tax_value: string | null;
        fee_percent: string | null;
        fee_value: string | null;
    }>;
    removeTaxFee(dbName: string, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        id_automated_point: string | null;
        tax_percent: string | null;
        tax_value: string | null;
        fee_percent: string | null;
        fee_value: string | null;
    }>;
    createDiscount(dbName: string, userId: string, dto: CreateDiscountDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        id_automated_point: string | null;
        discount_percent: string | null;
        discount_value: string | null;
    }>;
    findAllDiscounts(dbName: string, workplaceId?: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        id_automated_point: string | null;
        discount_percent: string | null;
        discount_value: string | null;
    }[]>;
    findOneDiscount(dbName: string, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        id_automated_point: string | null;
        discount_percent: string | null;
        discount_value: string | null;
    } | null>;
    updateDiscount(dbName: string, userId: string, id: string, dto: UpdateDiscountDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        id_automated_point: string | null;
        discount_percent: string | null;
        discount_value: string | null;
    }>;
    removeDiscount(dbName: string, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        id_automated_point: string | null;
        discount_percent: string | null;
        discount_value: string | null;
    }>;
}
