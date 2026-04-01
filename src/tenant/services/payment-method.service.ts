import { Injectable } from '@nestjs/common';
import { TenantService } from '../tenant.service';
import {
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
} from '../dto/payment-method.dto';

import { LogService } from './log.service';

@Injectable()
export class PaymentMethodService {
  constructor(
    private tenantService: TenantService,
    private logService: LogService,
  ) {}

  async create(dbName: string, userId: string, dto: CreatePaymentMethodDto) {
    const client = await this.tenantService.getClient(dbName);
    const paymentMethod = await client.s_Payment_Method.create({ data: dto });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'CREATE_PAYMENT_METHOD',
      paymentMethod,
    );

    return paymentMethod;
  }

  async seedDefaults(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    const existingCash = await client.s_Payment_Method.findFirst({
      where: { name: 'Cash', is_deleted: false },
    });

    if (!existingCash) {
      await client.s_Payment_Method.create({
        data: { name: 'Cash' },
      });
    }
  }

  async findAll(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Payment_Method.findMany({ where: { is_deleted: false } });
  }

  async findOne(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Payment_Method.findFirst({
      where: { id, is_deleted: false },
    });
  }

  async update(
    dbName: string,
    userId: string,
    id: string,
    dto: UpdatePaymentMethodDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    const paymentMethod = await client.s_Payment_Method.update({
      where: { id },
      data: dto,
    });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'UPDATE_PAYMENT_METHOD',
      paymentMethod,
    );

    return paymentMethod;
  }

  async remove(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Payment_Method.update({
      where: { id },
      data: { is_deleted: true },
    });
  }
}
