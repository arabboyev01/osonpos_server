import { TenantService } from '../tenant.service';
import { CreateAutomatedPointDto, UpdateAutomatedPointDto, CreateWorkplaceDto, UpdateWorkplaceDto, CreatePrinterDto, UpdatePrinterDto, CreatePaymentDeviceDto, UpdatePaymentDeviceDto } from '../dto/business.dto';
export declare class BusinessService {
    private tenantService;
    constructor(tenantService: TenantService);
    createPoint(dbName: string, dto: CreateAutomatedPointDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
    }>;
    findAllPoints(dbName: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
    }[]>;
    findOnePoint(dbName: string, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
    } | null>;
    updatePoint(dbName: string, id: string, dto: UpdateAutomatedPointDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
    }>;
    removePoint(dbName: string, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
    }>;
    createWorkplace(dbName: string, dto: CreateWorkplaceDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        automated_point_id: string;
    }>;
    findAllWorkplaces(dbName: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        automated_point_id: string;
    }[]>;
    findOneWorkplace(dbName: string, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        automated_point_id: string;
    } | null>;
    updateWorkplace(dbName: string, id: string, dto: UpdateWorkplaceDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        automated_point_id: string;
    }>;
    removeWorkplace(dbName: string, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        automated_point_id: string;
    }>;
    createPrinter(dbName: string, dto: CreatePrinterDto): Promise<{
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
    findAllPrinters(dbName: string): Promise<{
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
    findOnePrinter(dbName: string, id: string): Promise<{
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
    } | null>;
    updatePrinter(dbName: string, id: string, dto: UpdatePrinterDto): Promise<{
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
    removePrinter(dbName: string, id: string): Promise<{
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
    createPaymentDevice(dbName: string, dto: CreatePaymentDeviceDto): Promise<{
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
    findAllPaymentDevices(dbName: string): Promise<{
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
    findOnePaymentDevice(dbName: string, id: string): Promise<{
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
    } | null>;
    updatePaymentDevice(dbName: string, id: string, dto: UpdatePaymentDeviceDto): Promise<{
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
    removePaymentDevice(dbName: string, id: string): Promise<{
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
