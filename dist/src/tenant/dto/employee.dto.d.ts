export declare class CreateEmployeeDto {
    full_name: string;
    guid?: string;
    role_id: string;
    password: string;
    employee_address?: string;
    workplace_id?: string;
    telegram_id?: string;
    phone_number?: string;
    notes?: string;
    email?: string;
}
export declare class UpdateEmployeeDto {
    full_name?: string;
    role_id?: string;
    password?: string;
    employee_address?: string;
    workplace_id?: string;
    telegram_id?: string;
    phone_number?: string;
    notes?: string;
    email?: string;
}
export declare class CreateEmployeeRoleDto {
    name: string;
    access_resources: string[];
}
export declare class UpdateEmployeeRoleDto {
    name?: string;
    access_resources?: string[];
}
