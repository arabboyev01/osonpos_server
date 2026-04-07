import { InventarizationService } from '../services/inventarization.service';
import { CreateWarehouseDto, UpdateWarehouseDto } from '../dto/inventarization.dto';
export declare class WarehouseController {
    private readonly service;
    constructor(service: InventarizationService);
    create(req: any, dto: CreateWarehouseDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        location: string | null;
    }>;
    findAll(req: any): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        location: string | null;
    }[]>;
    findOne(req: any, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        location: string | null;
    }>;
    update(req: any, id: string, dto: UpdateWarehouseDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        location: string | null;
    }>;
    remove(req: any, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        location: string | null;
    }>;
}
