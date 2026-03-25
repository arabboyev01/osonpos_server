import { Module } from '@nestjs/common';
import { QzService } from './qz.service';
import { QzController } from './qz.controller';

@Module({
  providers: [QzService],
  controllers: [QzController],
  exports: [QzService],
})
export class QzModule {}
