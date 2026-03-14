import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { S_Tax_Fee_Type } from '@prisma/client';

// Tax & Fee
export class CreateTaxFeeDto {
  @IsString()
  @IsOptional()
  guid?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsEnum(S_Tax_Fee_Type)
  @IsNotEmpty()
  type: S_Tax_Fee_Type;

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
  value?: string;

  @IsEnum(S_Tax_Fee_Type)
  @IsOptional()
  type?: S_Tax_Fee_Type;

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
  @IsNotEmpty()
  value: string;

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
  value?: string;

  @IsString()
  @IsOptional()
  id_automated_point?: string;
}
