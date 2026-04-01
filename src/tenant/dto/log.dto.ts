import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { S_Logs_Type } from '@prisma/client';

export class CreateLogDto {
  @IsString()
  @IsOptional()
  user_id?: string;

  @IsEnum(S_Logs_Type)
  @IsNotEmpty()
  type: S_Logs_Type;

  @IsString()
  @IsNotEmpty()
  action: string;

  @IsString()
  @IsOptional()
  details?: string;
}
export class QueryLogDto {
  @IsOptional()
  @IsString()
  user_id?: string;

  @IsOptional()
  @IsEnum(S_Logs_Type)
  type?: S_Logs_Type;

  @IsOptional()
  @IsString()
  action?: string;

  @IsOptional()
  @IsString()
  from_date?: string;

  @IsOptional()
  @IsString()
  to_date?: string;

  @IsOptional()
  limit?: string;

  @IsOptional()
  offset?: string;
}
