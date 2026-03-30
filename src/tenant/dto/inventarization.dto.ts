import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

// --- Warehouse ---
export class CreateWarehouseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  location?: string;
}

export class UpdateWarehouseDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  location?: string;
}

// --- Supplier ---
export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  contact_person?: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;
}

export class UpdateSupplierDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  contact_person?: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;
}

// --- Stock List ---
export class CreateStockListDto {
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @IsString()
  @IsNotEmpty()
  stock_quantity: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  measureId: string;

  @IsDateString()
  @IsNotEmpty()
  dateFrom: string;

  @IsString()
  @IsNotEmpty()
  warehouseId: string;

  @IsString()
  @IsOptional()
  mon?: string;

  @IsString()
  @IsOptional()
  tue?: string;

  @IsString()
  @IsOptional()
  wed?: string;

  @IsString()
  @IsOptional()
  thu?: string;

  @IsString()
  @IsOptional()
  fri?: string;

  @IsString()
  @IsOptional()
  sat?: string;

  @IsString()
  @IsOptional()
  sun?: string;
}

export class UpdateStockListDto {
  @IsString()
  @IsOptional()
  stock_quantity?: string;

  @IsString()
  @IsOptional()
  price?: string;

  @IsString()
  @IsOptional()
  measureId?: string;

  @IsDateString()
  @IsOptional()
  dateFrom?: string;

  @IsString()
  @IsOptional()
  mon?: string;

  @IsString()
  @IsOptional()
  tue?: string;

  @IsString()
  @IsOptional()
  wed?: string;

  @IsString()
  @IsOptional()
  thu?: string;

  @IsString()
  @IsOptional()
  fri?: string;

  @IsString()
  @IsOptional()
  sat?: string;

  @IsString()
  @IsOptional()
  sun?: string;
}

// --- Inventory ---
export class InventoryItemDto {
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @IsString()
  @IsNotEmpty()
  quantity: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  plannedQuantity: string;

  @IsString()
  @IsNotEmpty()
  measureId: string;
}

export class CreateInventoryDto {
  @IsString()
  @IsOptional()
  guid?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  warehouseId: string[];

  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @IsString()
  @IsNotEmpty()
  total: string;

  @IsString()
  @IsNotEmpty()
  totalPlanned: string;

  @IsString()
  @IsNotEmpty()
  totalDiff: string;

  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsBoolean()
  @IsOptional()
  conducted?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InventoryItemDto)
  items: InventoryItemDto[];
}

export class UpdateInventoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  warehouseId?: string[];

  @IsString()
  @IsOptional()
  organizationId?: string;

  @IsString()
  @IsOptional()
  employeeId?: string;

  @IsString()
  @IsOptional()
  total?: string;

  @IsString()
  @IsOptional()
  totalPlanned?: string;

  @IsString()
  @IsOptional()
  totalDiff?: string;

  @IsString()
  @IsOptional()
  clientId?: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsBoolean()
  @IsOptional()
  conducted?: boolean;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => InventoryItemDto)
  items?: InventoryItemDto[];
}

// --- Receipt ---
export class ReceiptItemDto {
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @IsString()
  @IsNotEmpty()
  quantity: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  plannedQuantity: string;

  @IsString()
  @IsNotEmpty()
  measureId: string;

  @IsString()
  @IsOptional()
  rounding?: string;

  @IsString()
  @IsOptional()
  newPrice?: string;
}

export class CreateReceiptDto {
  @IsString()
  @IsOptional()
  guid?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  warehouseId: string[];

  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @IsString()
  @IsNotEmpty()
  total: string;

  @IsString()
  @IsNotEmpty()
  totalPlanned: string;

  @IsString()
  @IsNotEmpty()
  totalDiff: string;

  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsBoolean()
  @IsOptional()
  conducted?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReceiptItemDto)
  items: ReceiptItemDto[];
}

export class UpdateReceiptDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  warehouseId?: string[];

  @IsString()
  @IsOptional()
  organizationId?: string;

  @IsString()
  @IsOptional()
  employeeId?: string;

  @IsString()
  @IsOptional()
  total?: string;

  @IsString()
  @IsOptional()
  totalPlanned?: string;

  @IsString()
  @IsOptional()
  totalDiff?: string;

  @IsString()
  @IsOptional()
  clientId?: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsBoolean()
  @IsOptional()
  conducted?: boolean;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ReceiptItemDto)
  items?: ReceiptItemDto[];
}

// --- Cancellation (Write-off) ---
export class CancellationItemDto {
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @IsString()
  @IsNotEmpty()
  quantity: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  measureId: string;

  @IsString()
  @IsOptional()
  multiple?: string;
}

export class CreateCancellationDto {
  @IsString()
  @IsOptional()
  guid?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  warehouseId: string[];

  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsBoolean()
  @IsOptional()
  conducted?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CancellationItemDto)
  items: CancellationItemDto[];
}

export class UpdateCancellationDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  warehouseId?: string[];

  @IsString()
  @IsOptional()
  organizationId?: string;

  @IsString()
  @IsOptional()
  employeeId?: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsBoolean()
  @IsOptional()
  conducted?: boolean;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CancellationItemDto)
  items?: CancellationItemDto[];
}

// --- Movement ---
export class MovementItemDto {
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @IsString()
  @IsNotEmpty()
  quantity: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  measureId: string;

  @IsString()
  @IsOptional()
  multiple?: string;
}

export class CreateMovementDto {
  @IsString()
  @IsOptional()
  guid?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  warehouseId: string;

  @IsString()
  @IsNotEmpty()
  toWarehouseId: string;

  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MovementItemDto)
  items: MovementItemDto[];
}

export class UpdateMovementDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  organizationId?: string;

  @IsString()
  @IsOptional()
  employeeId?: string;

  @IsString()
  @IsOptional()
  warehouseId?: string;

  @IsString()
  @IsOptional()
  toWarehouseId?: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MovementItemDto)
  items?: MovementItemDto[];
}
