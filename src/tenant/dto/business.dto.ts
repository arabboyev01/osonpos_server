import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsIP,
  IsPort,
} from 'class-validator';

// Automated Point
export class CreateAutomatedPointDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  guid?: string;
}

export class UpdateAutomatedPointDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  guid?: string;
}

// Workplace
export class CreateWorkplaceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  guid?: string;

  @IsString()
  @IsNotEmpty()
  automated_point_id: string;

  @IsString()
  @IsNotEmpty()
  employee_id: string;
}

export class UpdateWorkplaceDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  guid?: string;

  @IsString()
  @IsOptional()
  automated_point_id?: string;

  @IsString()
  @IsOptional()
  employee_id?: string;
}

// Printer
export class CreatePrinterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  guid?: string;

  @IsString()
  @IsOptional()
  ip_address?: string;

  @IsString()
  @IsOptional()
  port?: string;

  @IsString()
  @IsOptional()
  provider?: string;

  @IsString()
  @IsOptional()
  mac_address?: string;

  @IsString()
  @IsOptional()
  type?: string;
}

export class UpdatePrinterDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  guid?: string;

  @IsString()
  @IsOptional()
  ip_address?: string;

  @IsString()
  @IsOptional()
  port?: string;

  @IsString()
  @IsOptional()
  provider?: string;

  @IsString()
  @IsOptional()
  mac_address?: string;

  @IsString()
  @IsOptional()
  type?: string;
}

// Payment Device
export class CreatePaymentDeviceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  guid?: string;

  @IsIP()
  @IsOptional()
  ip_address?: string;

  @IsString()
  @IsOptional()
  port?: string;

  @IsString()
  @IsOptional()
  provider?: string;

  @IsString()
  @IsOptional()
  mac_address?: string;

  @IsString()
  @IsOptional()
  type?: string;
}

export class UpdatePaymentDeviceDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  guid?: string;

  @IsIP()
  @IsOptional()
  ip_address?: string;

  @IsString()
  @IsOptional()
  port?: string;

  @IsString()
  @IsOptional()
  provider?: string;

  @IsString()
  @IsOptional()
  mac_address?: string;

  @IsString()
  @IsOptional()
  type?: string;
}
