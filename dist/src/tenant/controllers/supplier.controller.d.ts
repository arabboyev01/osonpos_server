import { InventarizationService } from '../services/inventarization.service';
import { CreateSupplierDto, UpdateSupplierDto } from '../dto/inventarization.dto';
export declare class SupplierController {
    private readonly service;
    constructor(service: InventarizationService);
    create(req: any, dto: CreateSupplierDto): Promise<{
        name: string;
        address: string | null;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        email: string | null;
        phone_number: string | null;
        description: string | null;
        contact_person: string | null;
    }>;
    findAll(req: any): Promise<{
        name: string;
        address: string | null;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        email: string | null;
        phone_number: string | null;
        description: string | null;
        contact_person: string | null;
    }[]>;
    findOne(req: any, id: string): Promise<{
        name: string;
        address: string | null;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        email: string | null;
        phone_number: string | null;
        description: string | null;
        contact_person: string | null;
    }>;
    update(req: any, id: string, dto: UpdateSupplierDto): Promise<{
        name: string;
        address: string | null;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        email: string | null;
        phone_number: string | null;
        description: string | null;
        contact_person: string | null;
    }>;
    remove(req: any, id: string): Promise<{
        name: string;
        address: string | null;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        email: string | null;
        phone_number: string | null;
        description: string | null;
        contact_person: string | null;
    }>;
}
