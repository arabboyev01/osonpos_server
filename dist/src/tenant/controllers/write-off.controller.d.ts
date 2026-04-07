import { InventarizationService } from '../services/inventarization.service';
import { CreateCancellationDto, UpdateCancellationDto } from '../dto/inventarization.dto';
export declare class WriteOffController {
    private readonly service;
    constructor(service: InventarizationService);
    create(req: any, dto: CreateCancellationDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        description: string | null;
        note: string | null;
        warehouseId: string[];
        organizationId: string;
        employeeId: string;
        conducted: boolean;
    }>;
    findAll(req: any): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        description: string | null;
        note: string | null;
        warehouseId: string[];
        organizationId: string;
        employeeId: string;
        conducted: boolean;
    }[]>;
    findOne(req: any, id: string): Promise<{
        items: {
            id: string;
            is_deleted: boolean;
            dt_created: Date;
            dt_updated: Date;
            price: string;
            quantity: string;
            itemId: string;
            measureId: string;
            cancellationId: string;
            multiple: string | null;
        }[];
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        description: string | null;
        note: string | null;
        warehouseId: string[];
        organizationId: string;
        employeeId: string;
        conducted: boolean;
    }>;
    update(req: any, id: string, dto: UpdateCancellationDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        description: string | null;
        note: string | null;
        warehouseId: string[];
        organizationId: string;
        employeeId: string;
        conducted: boolean;
    }>;
    remove(req: any, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        description: string | null;
        note: string | null;
        warehouseId: string[];
        organizationId: string;
        employeeId: string;
        conducted: boolean;
    }>;
}
