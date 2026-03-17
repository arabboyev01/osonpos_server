import { IsString, IsNotEmpty } from 'class-validator';

export class PosLoginDto {
  @IsString()
  @IsNotEmpty()
  workplaceId: string;

  @IsString()
  @IsNotEmpty()
  pincode: string;
}
