import { FinanceService } from '../services/finance.service';
import { CreateTaxFeeDto, UpdateTaxFeeDto, CreateDiscountDto, UpdateDiscountDto } from '../dto/finance.dto';
export declare class FinanceController {
    private readonly financeService;
    constructor(financeService: FinanceService);
    createTaxFee(req: any, dto: CreateTaxFeeDto): Promise<{
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
    findAllTaxFees(req: any): Promise<{
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
    updateTaxFee(req: any, id: string, dto: UpdateTaxFeeDto): Promise<{
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
    removeTaxFee(req: any, id: string): Promise<{
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
    createDiscount(req: any, dto: CreateDiscountDto): Promise<{
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
    findAllDiscounts(req: any): Promise<{
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
    updateDiscount(req: any, id: string, dto: UpdateDiscountDto): Promise<{
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
    removeDiscount(req: any, id: string): Promise<{
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
