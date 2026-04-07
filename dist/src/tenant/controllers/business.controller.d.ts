import { BusinessService } from '../services/business.service';
import { CreateAutomatedPointDto, UpdateAutomatedPointDto, CreateWorkplaceDto, UpdateWorkplaceDto, CreatePrinterDto, UpdatePrinterDto, CreatePaymentDeviceDto, UpdatePaymentDeviceDto } from '../dto/business.dto';
export declare class BusinessController {
    private readonly businessService;
    constructor(businessService: BusinessService);
    createPoint(req: any, dto: CreateAutomatedPointDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
    }>;
    findAllPoints(req: any): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
    }[]>;
    updatePoint(req: any, id: string, dto: UpdateAutomatedPointDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
    }>;
    removePoint(req: any, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
    }>;
    createWorkplace(req: any, dto: CreateWorkplaceDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        automated_point_id: string;
    }>;
    findAllWorkplaces(req: any): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        automated_point_id: string;
    }[]>;
    updateWorkplace(req: any, id: string, dto: UpdateWorkplaceDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        automated_point_id: string;
    }>;
    removeWorkplace(req: any, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        automated_point_id: string;
    }>;
    createPrinter(req: any, dto: CreatePrinterDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        type: string | null;
        ip_address: string | null;
        port: string | null;
        provider: string | null;
        mac_address: string | null;
    }>;
    findAllPrinters(req: any): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        type: string | null;
        ip_address: string | null;
        port: string | null;
        provider: string | null;
        mac_address: string | null;
    }[]>;
    updatePrinter(req: any, id: string, dto: UpdatePrinterDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        type: string | null;
        ip_address: string | null;
        port: string | null;
        provider: string | null;
        mac_address: string | null;
    }>;
    removePrinter(req: any, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        type: string | null;
        ip_address: string | null;
        port: string | null;
        provider: string | null;
        mac_address: string | null;
    }>;
    createPaymentDevice(req: any, dto: CreatePaymentDeviceDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        type: string | null;
        ip_address: string | null;
        port: string | null;
        provider: string | null;
        mac_address: string | null;
    }>;
    findAllPaymentDevices(req: any): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        type: string | null;
        ip_address: string | null;
        port: string | null;
        provider: string | null;
        mac_address: string | null;
    }[]>;
    updatePaymentDevice(req: any, id: string, dto: UpdatePaymentDeviceDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        type: string | null;
        ip_address: string | null;
        port: string | null;
        provider: string | null;
        mac_address: string | null;
    }>;
    removePaymentDevice(req: any, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        type: string | null;
        ip_address: string | null;
        port: string | null;
        provider: string | null;
        mac_address: string | null;
    }>;
}
