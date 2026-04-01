import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
  IsEnum,
} from 'class-validator';
import { S_Item_Type } from '@prisma/client';

// Item
export class CreateItemDto {
  @IsString()
  @IsOptional()
  group_id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  search_name?: string;

  @IsString()
  @IsNotEmpty()
  measurement: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsOptional()
  cost?: string;

  @IsString()
  @IsOptional()
  shtrix?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsEnum(S_Item_Type)
  type: S_Item_Type;

  @IsArray()
  @IsOptional()
  pictures?: string[];

  @IsBoolean()
  @IsOptional()
  is_menu?: boolean;

  @IsBoolean()
  @IsOptional()
  is_service?: boolean;

  @IsBoolean()
  @IsOptional()
  allow_pickup?: boolean;

  @IsBoolean()
  @IsOptional()
  allow_delivery?: boolean;

  @IsString()
  @IsOptional()
  id_automated_point?: string;

  @IsString()
  @IsOptional()
  tax_id?: string;

  @IsString()
  @IsOptional()
  discount_id?: string;

  @IsString()
  @IsOptional()
  stock_quantity?: string;

  @IsString()
  @IsOptional()
  warehouseId?: string;
}

export class UpdateItemDto {
  @IsString()
  @IsOptional()
  group_id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  search_name?: string;

  @IsString()
  @IsOptional()
  measurement?: string;

  @IsString()
  @IsOptional()
  price?: string;

  @IsString()
  @IsOptional()
  cost?: string;

  @IsString()
  @IsOptional()
  shtrix?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsEnum(S_Item_Type)
  @IsOptional()
  type?: S_Item_Type;

  @IsArray()
  @IsOptional()
  pictures?: string[];

  @IsBoolean()
  @IsOptional()
  is_menu?: boolean;

  @IsBoolean()
  @IsOptional()
  is_service?: boolean;

  @IsBoolean()
  @IsOptional()
  allow_pickup?: boolean;

  @IsBoolean()
  @IsOptional()
  allow_delivery?: boolean;

  @IsString()
  @IsOptional()
  id_automated_point?: string;

  @IsString()
  @IsOptional()
  tax_id?: string;

  @IsString()
  @IsOptional()
  discount_id?: string;

  @IsString()
  @IsOptional()
  stock_quantity?: string;

  @IsString()
  @IsOptional()
  warehouseId?: string;
}

// Item Group
export class CreateItemGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  search_name?: string;

  @IsString()
  @IsNotEmpty()
  measurement: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsOptional()
  cost?: string;

  @IsString()
  @IsOptional()
  shtrix?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsArray()
  @IsOptional()
  pictures?: string[];

  @IsBoolean()
  @IsOptional()
  is_menu?: boolean;

  @IsBoolean()
  @IsOptional()
  is_service?: boolean;

  @IsBoolean()
  @IsOptional()
  allow_pickup?: boolean;

  @IsBoolean()
  @IsOptional()
  allow_delivery?: boolean;

  @IsString()
  @IsOptional()
  id_automated_point?: string;

  @IsString()
  @IsOptional()
  tax_id?: string;

  @IsString()
  @IsOptional()
  discount_id?: string;

  @IsEnum(S_Item_Type)
  type: S_Item_Type;
}

export class UpdateItemGroupDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  search_name?: string;

  @IsString()
  @IsOptional()
  measurement?: string;

  @IsString()
  @IsOptional()
  price?: string;

  @IsString()
  @IsOptional()
  cost?: string;

  @IsString()
  @IsOptional()
  shtrix?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsArray()
  @IsOptional()
  pictures?: string[];

  @IsBoolean()
  @IsOptional()
  is_menu?: boolean;

  @IsBoolean()
  @IsOptional()
  is_service?: boolean;

  @IsBoolean()
  @IsOptional()
  allow_pickup?: boolean;

  @IsBoolean()
  @IsOptional()
  allow_delivery?: boolean;

  @IsString()
  @IsOptional()
  id_automated_point?: string;

  @IsString()
  @IsOptional()
  tax_id?: string;

  @IsString()
  @IsOptional()
  discount_id?: string;

  @IsEnum(S_Item_Type)
  @IsOptional()
  type?: S_Item_Type;
}

// Modifier
export class CreateModifierDto {
  @IsString()
  @IsOptional()
  group_id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  item_id?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  search_name?: string;

  @IsString()
  @IsNotEmpty()
  measurement: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsOptional()
  cost?: string;

  @IsString()
  @IsOptional()
  shtrix?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsEnum(S_Item_Type)
  type: S_Item_Type;

  @IsArray()
  @IsOptional()
  pictures?: string[];

  @IsBoolean()
  @IsOptional()
  is_menu?: boolean;

  @IsBoolean()
  @IsOptional()
  is_service?: boolean;

  @IsBoolean()
  @IsOptional()
  allow_pickup?: boolean;

  @IsBoolean()
  @IsOptional()
  allow_delivery?: boolean;

  @IsString()
  @IsOptional()
  id_automated_point?: string;

  @IsString()
  @IsOptional()
  tax_id?: string;

  @IsString()
  @IsOptional()
  discount_id?: string;

  @IsString()
  @IsOptional()
  stock_quantity?: string;

  @IsString()
  @IsOptional()
  warehouseId?: string;
}

export class UpdateModifierDto {
  @IsString()
  @IsOptional()
  group_id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  item_id?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  search_name?: string;

  @IsString()
  @IsOptional()
  measurement?: string;

  @IsString()
  @IsOptional()
  price?: string;

  @IsString()
  @IsOptional()
  cost?: string;

  @IsString()
  @IsOptional()
  shtrix?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsEnum(S_Item_Type)
  @IsOptional()
  type?: S_Item_Type;

  @IsArray()
  @IsOptional()
  pictures?: string[];

  @IsBoolean()
  @IsOptional()
  is_menu?: boolean;

  @IsBoolean()
  @IsOptional()
  is_service?: boolean;

  @IsBoolean()
  @IsOptional()
  allow_pickup?: boolean;

  @IsBoolean()
  @IsOptional()
  allow_delivery?: boolean;

  @IsString()
  @IsOptional()
  id_automated_point?: string;

  @IsString()
  @IsOptional()
  tax_id?: string;

  @IsString()
  @IsOptional()
  discount_id?: string;

  @IsString()
  @IsOptional()
  stock_quantity?: string;

  @IsString()
  @IsOptional()
  warehouseId?: string;
}

// Modifier Group
export class CreateModifierGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  search_name?: string;

  @IsString()
  @IsNotEmpty()
  measurement: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsOptional()
  cost?: string;

  @IsString()
  @IsOptional()
  shtrix?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsArray()
  @IsOptional()
  pictures?: string[];

  @IsEnum(S_Item_Type)
  type: S_Item_Type;

  @IsBoolean()
  @IsOptional()
  is_menu?: boolean;

  @IsBoolean()
  @IsOptional()
  is_service?: boolean;

  @IsBoolean()
  @IsOptional()
  allow_pickup?: boolean;

  @IsBoolean()
  @IsOptional()
  allow_delivery?: boolean;

  @IsString()
  @IsOptional()
  id_automated_point?: string;

  @IsString()
  @IsOptional()
  tax_id?: string;

  @IsString()
  @IsOptional()
  discount_id?: string;
}

export class UpdateModifierGroupDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  search_name?: string;

  @IsString()
  @IsOptional()
  measurement?: string;

  @IsString()
  @IsOptional()
  price?: string;

  @IsString()
  @IsOptional()
  cost?: string;

  @IsString()
  @IsOptional()
  shtrix?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsArray()
  @IsOptional()
  pictures?: string[];

  @IsEnum(S_Item_Type)
  @IsOptional()
  type?: S_Item_Type;

  @IsBoolean()
  @IsOptional()
  is_menu?: boolean;

  @IsBoolean()
  @IsOptional()
  is_service?: boolean;

  @IsBoolean()
  @IsOptional()
  allow_pickup?: boolean;

  @IsBoolean()
  @IsOptional()
  allow_delivery?: boolean;

  @IsString()
  @IsOptional()
  id_automated_point?: string;

  @IsString()
  @IsOptional()
  tax_id?: string;

  @IsString()
  @IsOptional()
  discount_id?: string;
}
