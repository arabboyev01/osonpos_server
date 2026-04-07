import { ClientService } from '../services/client.service';
import { CreateClientDto, UpdateClientDto } from '../dto/client.dto';
export declare class ClientController {
    private readonly service;
    constructor(service: ClientService);
    create(req: any, dto: CreateClientDto): Promise<{
        address: string | null;
        full_name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        email: string | null;
        phone_number: string | null;
        birthday: Date | null;
    }>;
    findAll(req: any): Promise<{
        address: string | null;
        full_name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        email: string | null;
        phone_number: string | null;
        birthday: Date | null;
    }[]>;
    findOne(req: any, id: string): Promise<{
        address: string | null;
        full_name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        email: string | null;
        phone_number: string | null;
        birthday: Date | null;
    }>;
    update(req: any, id: string, dto: UpdateClientDto): Promise<{
        address: string | null;
        full_name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        email: string | null;
        phone_number: string | null;
        birthday: Date | null;
    }>;
    remove(req: any, id: string): Promise<{
        address: string | null;
        full_name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        email: string | null;
        phone_number: string | null;
        birthday: Date | null;
    }>;
}
