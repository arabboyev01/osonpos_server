import { S_Item_Type } from '@prisma/client';
export declare class CreateItemDto {
    group_id?: string;
    name: string;
    description?: string;
    search_name?: string;
    measurement: string;
    price: string;
    cost?: string;
    shtrix?: string;
    color?: string;
    type: S_Item_Type;
    pictures?: string[];
    is_menu?: boolean;
    is_service?: boolean;
    allow_pickup?: boolean;
    allow_delivery?: boolean;
    id_automated_point?: string;
    tax_id?: string;
    discount_id?: string;
    stock_quantity?: string;
    warehouseId?: string;
}
export declare class UpdateItemDto {
    group_id?: string;
    name?: string;
    description?: string;
    search_name?: string;
    measurement?: string;
    price?: string;
    cost?: string;
    shtrix?: string;
    color?: string;
    type?: S_Item_Type;
    pictures?: string[];
    is_menu?: boolean;
    is_service?: boolean;
    allow_pickup?: boolean;
    allow_delivery?: boolean;
    id_automated_point?: string;
    tax_id?: string;
    discount_id?: string;
    stock_quantity?: string;
    warehouseId?: string;
}
export declare class CreateItemGroupDto {
    name: string;
    description?: string;
    search_name?: string;
    measurement: string;
    price: string;
    cost?: string;
    shtrix?: string;
    color?: string;
    pictures?: string[];
    is_menu?: boolean;
    is_service?: boolean;
    allow_pickup?: boolean;
    allow_delivery?: boolean;
    id_automated_point?: string;
    tax_id?: string;
    discount_id?: string;
    type: S_Item_Type;
}
export declare class UpdateItemGroupDto {
    name?: string;
    description?: string;
    search_name?: string;
    measurement?: string;
    price?: string;
    cost?: string;
    shtrix?: string;
    color?: string;
    pictures?: string[];
    is_menu?: boolean;
    is_service?: boolean;
    allow_pickup?: boolean;
    allow_delivery?: boolean;
    id_automated_point?: string;
    tax_id?: string;
    discount_id?: string;
    type?: S_Item_Type;
}
export declare class CreateModifierDto {
    group_id?: string;
    name: string;
    item_id?: string;
    description?: string;
    search_name?: string;
    measurement: string;
    price: string;
    cost?: string;
    shtrix?: string;
    color?: string;
    type: S_Item_Type;
    pictures?: string[];
    is_menu?: boolean;
    is_service?: boolean;
    allow_pickup?: boolean;
    allow_delivery?: boolean;
    id_automated_point?: string;
    tax_id?: string;
    discount_id?: string;
    stock_quantity?: string;
    warehouseId?: string;
}
export declare class UpdateModifierDto {
    group_id?: string;
    name?: string;
    item_id?: string;
    description?: string;
    search_name?: string;
    measurement?: string;
    price?: string;
    cost?: string;
    shtrix?: string;
    color?: string;
    type?: S_Item_Type;
    pictures?: string[];
    is_menu?: boolean;
    is_service?: boolean;
    allow_pickup?: boolean;
    allow_delivery?: boolean;
    id_automated_point?: string;
    tax_id?: string;
    discount_id?: string;
    stock_quantity?: string;
    warehouseId?: string;
}
export declare class CreateModifierGroupDto {
    name: string;
    description?: string;
    search_name?: string;
    measurement: string;
    price: string;
    cost?: string;
    shtrix?: string;
    color?: string;
    pictures?: string[];
    type: S_Item_Type;
    is_menu?: boolean;
    is_service?: boolean;
    allow_pickup?: boolean;
    allow_delivery?: boolean;
    id_automated_point?: string;
    tax_id?: string;
    discount_id?: string;
}
export declare class UpdateModifierGroupDto {
    name?: string;
    description?: string;
    search_name?: string;
    measurement?: string;
    price?: string;
    cost?: string;
    shtrix?: string;
    color?: string;
    pictures?: string[];
    type?: S_Item_Type;
    is_menu?: boolean;
    is_service?: boolean;
    allow_pickup?: boolean;
    allow_delivery?: boolean;
    id_automated_point?: string;
    tax_id?: string;
    discount_id?: string;
}
