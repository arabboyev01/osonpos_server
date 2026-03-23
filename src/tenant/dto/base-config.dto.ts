import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBaseConfigDto {
  @IsString()
  @IsNotEmpty()
  key_name: string;

  @IsString()
  @IsNotEmpty()
  key_value: string;
}

export class UpdateBaseConfigDto {
  @IsString()
  @IsOptional()
  key_name?: string;

  @IsString()
  @IsOptional()
  key_value?: string;
}
