import { IsString, IsNotEmpty, IsOptional, IsEnum, MinLength, IsEmail } from 'class-validator';
import { S_Employee_Role } from '@prisma/client';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsOptional()
  guid?: string;

  @IsEnum(S_Employee_Role)
  role: S_Employee_Role;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @IsString()
  @IsOptional()
  employee_address?: string;

  @IsString()
  @IsOptional()
  telegram_id?: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  full_name?: string;

  @IsEnum(S_Employee_Role)
  @IsOptional()
  role?: S_Employee_Role;

  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsString()
  @IsOptional()
  employee_address?: string;

  @IsString()
  @IsOptional()
  telegram_id?: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
