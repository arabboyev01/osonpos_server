import { Module } from '@nestjs/common';
import { BusinessesService } from './businesses.service';

@Module({
  providers: [BusinessesService]
})
export class BusinessesModule {}
