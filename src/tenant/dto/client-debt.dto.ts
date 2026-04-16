import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateClientDebtDto {
  @IsString()
  @IsNotEmpty()
  client_id: string;

  @IsString()
  @IsNotEmpty()
  debt_amount: string;

  @IsString()
  @IsNotEmpty()
  employee_id: string;

  @IsString()
  @IsNotEmpty()
  id_automated_point: string;
}

export class UpdateClientDebtDto {
  @IsString()
  @IsOptional()
  debt_amount?: string;

  @IsBoolean()
  @IsOptional()
  is_deleted?: boolean;
}

export class CreateClientDebtTransactionDto {
  @IsString()
  @IsNotEmpty()
  client_id: string;

  @IsString()
  @IsNotEmpty()
  debt_amount: string;

  @IsString()
  @IsNotEmpty()
  employee_id: string;

  @IsString()
  @IsNotEmpty()
  id_automated_point: string;
}
