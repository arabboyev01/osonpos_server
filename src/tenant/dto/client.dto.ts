import { IsString, IsOptional, IsEmail, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsDateString()
  @IsOptional()
  birthday?: string;
}

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  full_name?: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsDateString()
  @IsOptional()
  birthday?: string;
  }
