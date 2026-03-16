import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMeasurementDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateMeasurementDto {
  @IsString()
  @IsOptional()
  name?: string;
}
