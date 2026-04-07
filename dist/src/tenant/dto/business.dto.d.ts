export declare class CreateAutomatedPointDto {
    name: string;
    guid?: string;
}
export declare class UpdateAutomatedPointDto {
    name?: string;
    guid?: string;
}
export declare class CreateWorkplaceDto {
    name: string;
    guid?: string;
    automated_point_id: string;
}
export declare class UpdateWorkplaceDto {
    name?: string;
    guid?: string;
    automated_point_id?: string;
}
export declare class CreatePrinterDto {
    name: string;
    guid?: string;
    ip_address?: string;
    port?: string;
    provider?: string;
    mac_address?: string;
    type?: string;
}
export declare class UpdatePrinterDto {
    name?: string;
    guid?: string;
    ip_address?: string;
    port?: string;
    provider?: string;
    mac_address?: string;
    type?: string;
}
export declare class CreatePaymentDeviceDto {
    name: string;
    guid?: string;
    ip_address?: string;
    port?: string;
    provider?: string;
    mac_address?: string;
    type?: string;
}
export declare class UpdatePaymentDeviceDto {
    name?: string;
    guid?: string;
    ip_address?: string;
    port?: string;
    provider?: string;
    mac_address?: string;
    type?: string;
}
