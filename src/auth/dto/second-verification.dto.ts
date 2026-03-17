import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class EnableSecondVerificationDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

export class UpdateSecondVerificationPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

export class VerifySecondVerificationDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
