import { InventarizationService } from '../services/inventarization.service';
import { CreateMovementDto, UpdateMovementDto } from '../dto/inventarization.dto';
export declare class MovementController {
    private readonly service;
    constructor(service: InventarizationService);
    create(req: any, dto: CreateMovementDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        description: string | null;
        note: string | null;
        warehouseId: string;
        organizationId: string;
        employeeId: string;
        toWarehouseId: string;
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
        warehouseId: string;
        organizationId: string;
        employeeId: string;
        toWarehouseId: string;
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
            multiple: string | null;
            movementId: string;
        }[];
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        description: string | null;
        note: string | null;
        warehouseId: string;
        organizationId: string;
        employeeId: string;
        toWarehouseId: string;
    }>;
    update(req: any, id: string, dto: UpdateMovementDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        description: string | null;
        note: string | null;
        warehouseId: string;
        organizationId: string;
        employeeId: string;
        toWarehouseId: string;
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
        warehouseId: string;
        organizationId: string;
        employeeId: string;
        toWarehouseId: string;
    }>;
}
