import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

// Tax & Fee
export class CreateTaxFeeDto {
  @IsString()
  @IsOptional()
  guid?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

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

  @IsString()
  @IsOptional()
  id_automated_point?: string;
}

export class UpdateTaxFeeDto {
  @IsString()
  @IsOptional()
  guid?: string;

  @IsString()
  @IsOptional()
  name?: string;

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

  @IsString()
  @IsOptional()
  id_automated_point?: string;
}

// Discount
export class CreateDiscountDto {
  @IsString()
  @IsOptional()
  guid?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  discount_percent?: string;

  @IsString()
  @IsOptional()
  discount_value?: string;

  @IsString()
  @IsOptional()
  id_automated_point?: string;
}

export class UpdateDiscountDto {
  @IsString()
  @IsOptional()
  guid?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  discount_percent?: string;

  @IsString()
  @IsOptional()
  discount_value?: string;

  @IsString()
  @IsOptional()
  id_automated_point?: string;
}
