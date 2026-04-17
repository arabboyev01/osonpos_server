import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsEmail,
  MaxLength,
  IsArray,
  IsNumberString,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsOptional()
  guid?: string;

  @IsString()
  @IsNotEmpty()
  role_id: string;

  @IsString()
  @IsNotEmpty()
  @IsNumberString({}, { message: 'PIN kod faqat raqamlardan iborat bo\'lishi kerak' })
  @MinLength(4)
  @MaxLength(4)
  password: string;

  @IsString()
  @IsOptional()
  employee_address?: string;

  @IsString()
  @IsOptional()
  workplace_id?: string;

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

  @IsString()
  @IsOptional()
  role_id?: string;

  @IsString()
  @IsOptional()
  @IsNumberString({}, { message: 'PIN kod faqat raqamlardan iborat bo\'lishi kerak' })
  @MinLength(4)
  @MaxLength(4)
  password?: string;

  @IsString()
  @IsOptional()
  employee_address?: string;

  @IsString()
  @IsOptional()
  workplace_id?: string;

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

export class CreateEmployeeRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  access_resources: string[];
}

export class UpdateEmployeeRoleDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  access_resources?: string[];
}
