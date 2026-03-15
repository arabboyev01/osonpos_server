import { IsString, IsNotEmpty } from 'class-validator';

export class RawQueryDto {
  @IsString()
  @IsNotEmpty()
  query: string;
}
