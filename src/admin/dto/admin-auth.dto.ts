import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminLoginDto {
  @ApiProperty({ example: 'osonpos_admin' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: 'osonpos_pass123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
