import { IsString, IsOptional, IsBoolean, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateSettlmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  is_closed?: boolean;

  @IsDateString()
  @IsOptional()
  dt_closed?: string;
}

export class UpdateSettlmentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  is_closed?: boolean;

  @IsDateString()
  @IsOptional()
  dt_closed?: string;
}
