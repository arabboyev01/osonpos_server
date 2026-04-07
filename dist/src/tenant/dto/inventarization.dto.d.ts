export declare class CreateWarehouseDto {
    name: string;
    location?: string;
}
export declare class UpdateWarehouseDto {
    name?: string;
    location?: string;
}
export declare class CreateSupplierDto {
    name: string;
    description?: string;
    contact_person?: string;
    phone_number?: string;
    email?: string;
    address?: string;
}
export declare class UpdateSupplierDto {
    name?: string;
    description?: string;
    contact_person?: string;
    phone_number?: string;
    email?: string;
    address?: string;
}
export declare class CreateStockListDto {
    itemId: string;
    stock_quantity: string;
    price: string;
    measureId: string;
    dateFrom: string;
    warehouseId: string;
    mon?: string;
    tue?: string;
    wed?: string;
    thu?: string;
    fri?: string;
    sat?: string;
    sun?: string;
}
export declare class UpdateStockListDto {
    stock_quantity?: string;
    price?: string;
    measureId?: string;
    dateFrom?: string;
    mon?: string;
    tue?: string;
    wed?: string;
    thu?: string;
    fri?: string;
    sat?: string;
    sun?: string;
}
export declare class InventoryItemDto {
    itemId: string;
    quantity: string;
    price: string;
    plannedQuantity: string;
    measureId: string;
}
export declare class CreateInventoryDto {
    guid?: string;
    name: string;
    description?: string;
    warehouseId: string[];
    organizationId: string;
    total: string;
    totalPlanned: string;
    totalDiff: string;
    employeeId: string;
    clientId: string;
    note?: string;
    conducted?: boolean;
    items: InventoryItemDto[];
}
export declare class UpdateInventoryDto {
    name?: string;
    description?: string;
    warehouseId?: string[];
    organizationId?: string;
    employeeId?: string;
    total?: string;
    totalPlanned?: string;
    totalDiff?: string;
    clientId?: string;
    note?: string;
    conducted?: boolean;
    items?: InventoryItemDto[];
}
export declare class ReceiptItemDto {
    itemId: string;
    quantity: string;
    price: string;
    plannedQuantity: string;
    measureId: string;
    rounding?: string;
    newPrice?: string;
}
export declare class CreateReceiptDto {
    guid?: string;
    name: string;
    description?: string;
    warehouseId: string[];
    organizationId: string;
    total: string;
    totalPlanned: string;
    totalDiff: string;
    employeeId: string;
    clientId: string;
    note?: string;
    conducted?: boolean;
    items: ReceiptItemDto[];
}
export declare class UpdateReceiptDto {
    name?: string;
    description?: string;
    warehouseId?: string[];
    organizationId?: string;
    employeeId?: string;
    total?: string;
    totalPlanned?: string;
    totalDiff?: string;
    clientId?: string;
    note?: string;
    conducted?: boolean;
    items?: ReceiptItemDto[];
}
export declare class CancellationItemDto {
    itemId: string;
    quantity: string;
    price: string;
    measureId: string;
    multiple?: string;
}
export declare class CreateCancellationDto {
    guid?: string;
    name: string;
    description?: string;
    warehouseId: string[];
    organizationId: string;
    employeeId: string;
    note?: string;
    conducted?: boolean;
    items: CancellationItemDto[];
}
export declare class UpdateCancellationDto {
    name?: string;
    description?: string;
    warehouseId?: string[];
    organizationId?: string;
    employeeId?: string;
    note?: string;
    conducted?: boolean;
    items?: CancellationItemDto[];
}
export declare class MovementItemDto {
    itemId: string;
    quantity: string;
    price: string;
    measureId: string;
    multiple?: string;
}
export declare class CreateMovementDto {
    guid?: string;
    name: string;
    description?: string;
    warehouseId: string;
    toWarehouseId: string;
    organizationId: string;
    employeeId: string;
    note?: string;
    items: MovementItemDto[];
}
export declare class UpdateMovementDto {
    name?: string;
    description?: string;
    organizationId?: string;
    employeeId?: string;
    warehouseId?: string;
    toWarehouseId?: string;
    note?: string;
    items?: MovementItemDto[];
}
