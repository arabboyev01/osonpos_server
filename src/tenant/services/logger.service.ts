import { Injectable } from '@nestjs/common';
import { TenantService } from '../tenant.service';

@Injectable()
export class LoggerService {
  constructor(private tenantService: TenantService) {}

  async log(
    dbName: string,
    userId: string | null,
    type: 'SYSTEM' | 'USER' | 'EMPLOYEE' | 'PAYMENT_DEVICE' | 'ORDER' | 'AUTH',
    action: string,
    details?: string,
  ) {
    try {
      const client = await this.tenantService.getClient(dbName);
      await client.s_Logs.create({
        data: {
          user_id: userId,
          type: type as any,
          action: action,
          details: details,
        },
      });
    } catch (error) {
      console.error(`Failed to write log to ${dbName}:`, error.message);
    }
  }
}
