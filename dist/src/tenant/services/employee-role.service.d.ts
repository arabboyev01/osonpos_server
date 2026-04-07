import { TenantService } from '../tenant.service';
import { CreateEmployeeRoleDto, UpdateEmployeeRoleDto } from '../dto/employee.dto';
export declare class EmployeeRoleService {
    private tenantService;
    constructor(tenantService: TenantService);
    create(dbName: string, dto: CreateEmployeeRoleDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        access_resources: string[];
    }>;
    findAll(dbName: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        access_resources: string[];
    }[]>;
    findOne(dbName: string, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        access_resources: string[];
    }>;
    update(dbName: string, id: string, dto: UpdateEmployeeRoleDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        access_resources: string[];
    }>;
    remove(dbName: string, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        access_resources: string[];
    }>;
}
