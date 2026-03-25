import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class QzService {
  constructor(private configService: ConfigService) {}

  getCertificate(): string {
    const cert = this.configService.get<string>('QZ_CERTIFICATE');
    if (!cert) return '';
    // Handle escaped newlines from env
    return cert.replace(/\\n/g, '\n');
  }

  async signRequest(request: string): Promise<string> {
    const privateKey = this.configService.get<string>('QZ_PRIVATE_KEY');
    if (!privateKey) {
      throw new Error('QZ_PRIVATE_KEY is not defined');
    }

    const cleanKey = privateKey.replace(/\\n/g, '\n');
    
    const sign = crypto.createSign('RSA-SHA512');
    sign.update(request);
    sign.end();

    return sign.sign(cleanKey, 'base64');
  }
}
