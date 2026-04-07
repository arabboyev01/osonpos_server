import { EmployeeRoleService } from '../services/employee-role.service';
import { CreateEmployeeRoleDto, UpdateEmployeeRoleDto } from '../dto/employee.dto';
export declare class EmployeeRoleController {
    private readonly roleService;
    constructor(roleService: EmployeeRoleService);
    create(req: any, dto: CreateEmployeeRoleDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        access_resources: string[];
    }>;
    findAll(req: any): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        access_resources: string[];
    }[]>;
    findOne(req: any, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        access_resources: string[];
    }>;
    update(req: any, id: string, dto: UpdateEmployeeRoleDto): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        access_resources: string[];
    }>;
    remove(req: any, id: string): Promise<{
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        access_resources: string[];
    }>;
}
