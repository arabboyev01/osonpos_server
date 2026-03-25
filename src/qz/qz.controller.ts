import { Controller, Get, Post, Body } from '@nestjs/common';
import { QzService } from './qz.service';

@Controller('qz')
export class QzController {
  constructor(private readonly qzService: QzService) {}

  @Get('certificate')
  getCertificate(): string {
    return this.qzService.getCertificate();
  }

  @Post('sign')
  async signRequest(@Body('request') request: string): Promise<string> {
    return this.qzService.signRequest(request);
  }
}
