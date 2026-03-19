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

export class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  item_id: string;

  @IsString()
  @IsNotEmpty()
  quantity: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  subtotal: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsString()
  @IsOptional()
  discount_id?: string;
}

export class OrderDiscountDto {
  @IsString()
  @IsOptional()
  item_id?: string;

  @IsString()
  @IsOptional()
  discount_value?: string;

  @IsString()
  @IsOptional()
  discount_percent?: string;

  @IsString()
  @IsOptional()
  discount_id?: string;
}

export class OrderItemTaxDto {
  @IsString()
  @IsOptional()
  item_id?: string;

  @IsString()
  @IsNotEmpty()
  tax_id: string;

  @IsString()
  @IsOptional()
  tax_percent?: string;

  @IsString()
  @IsOptional()
  tax_value?: string;

  @IsString()
  @IsOptional()
  fee_percent?: string;

  @IsString()
  @IsOptional()
  fee_value?: string;
}

export class OrderDeliveryDto {
  @IsString()
  @IsNotEmpty()
  customer_name: string;

  @IsString()
  @IsNotEmpty()
  contact_phone: string;

  @IsString()
  @IsNotEmpty()
  shipping_address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  postal_code: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsDateString()
  @IsOptional()
  estimated_arrival?: string;
}

export class CreateOrderDto {
  @IsString()
  @IsOptional()
  guid?: string;

  @IsString()
  @IsNotEmpty()
  order_id: string;

  @IsString()
  @IsOptional()
  order_name?: string;

  @IsString()
  @IsOptional()
  total_discount?: string;

  @IsString()
  @IsOptional()
  total_tax?: string;

  @IsString()
  @IsOptional()
  total_paid?: string;

  @IsString()
  @IsOptional()
  total_change?: string;

  @IsString()
  @IsNotEmpty()
  subtotal: string;

  @IsString()
  @IsNotEmpty()
  total_sum: string;

  @IsString()
  @IsOptional()
  discount_percent?: string;

  @IsString()
  @IsOptional()
  discount_sum?: string;

  @IsString()
  @IsOptional()
  employee_id?: string;

  @IsString()
  @IsOptional()
  client_id?: string;

  @IsString()
  @IsOptional()
  payment_id?: string;

  @IsString()
  @IsNotEmpty()
  automated_point_id: string;

  @IsString()
  @IsNotEmpty()
  workplace_id: string;

  @IsString()
  @IsOptional()
  barcode?: string;

  @IsString()
  @IsOptional()
  delivery_fee?: string;

  @IsString()
  @IsNotEmpty()
  payment_type_id: string;

  @IsBoolean()
  @IsOptional()
  is_closed?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OrderDiscountDto)
  discounts?: OrderDiscountDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OrderItemTaxDto)
  taxes?: OrderItemTaxDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => OrderDeliveryDto)
  delivery?: OrderDeliveryDto;
}

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  order_name?: string;

  @IsString()
  @IsOptional()
  total_discount?: string;

  @IsString()
  @IsOptional()
  total_tax?: string;

  @IsString()
  @IsOptional()
  total_paid?: string;

  @IsString()
  @IsOptional()
  total_change?: string;

  @IsString()
  @IsOptional()
  subtotal?: string;

  @IsString()
  @IsOptional()
  total_sum?: string;

  @IsString()
  @IsOptional()
  discount_percent?: string;

  @IsString()
  @IsOptional()
  discount_sum?: string;

  @IsString()
  @IsOptional()
  client_id?: string;

  @IsString()
  @IsOptional()
  payment_id?: string;

  @IsString()
  @IsOptional()
  delivery_fee?: string;

  @IsString()
  @IsOptional()
  payment_type_id?: string;

  @IsBoolean()
  @IsOptional()
  is_closed?: boolean;

  @IsBoolean()
  @IsOptional()
  is_voided?: boolean;

  @IsBoolean()
  @IsOptional()
  is_refunded?: boolean;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items?: OrderItemDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OrderDiscountDto)
  discounts?: OrderDiscountDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OrderItemTaxDto)
  taxes?: OrderItemTaxDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => OrderDeliveryDto)
  delivery?: OrderDeliveryDto;
}

