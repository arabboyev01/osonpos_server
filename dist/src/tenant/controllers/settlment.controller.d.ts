import { SettlmentService } from '../services/settlment.service';
import { CreateSettlmentDto, UpdateSettlmentDto } from '../dto/settlment.dto';
export declare class SettlmentController {
    private readonly service;
    constructor(service: SettlmentService);
    create(req: any, dto: CreateSettlmentDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        dt_closed: Date | null;
        is_closed: boolean;
    }>;
    findAll(req: any): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        dt_closed: Date | null;
        is_closed: boolean;
    }[]>;
    findLatest(req: any): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        dt_closed: Date | null;
        is_closed: boolean;
    } | null>;
    findOne(req: any, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        dt_closed: Date | null;
        is_closed: boolean;
    }>;
    update(req: any, id: string, dto: UpdateSettlmentDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        dt_closed: Date | null;
        is_closed: boolean;
    }>;
    remove(req: any, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        dt_closed: Date | null;
        is_closed: boolean;
    }>;
}
