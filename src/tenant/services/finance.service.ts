import { Injectable } from '@nestjs/common';
import { TenantService } from '../tenant.service';
import {
  CreateTaxFeeDto,
  UpdateTaxFeeDto,
  CreateDiscountDto,
  UpdateDiscountDto,
} from '../dto/finance.dto';

import { LogService } from './log.service';

@Injectable()
export class FinanceService {
  constructor(
    private tenantService: TenantService,
    private logService: LogService,
  ) {}

  // Tax & Fee
  async createTaxFee(dbName: string, userId: string, dto: CreateTaxFeeDto) {
    const client = await this.tenantService.getClient(dbName);
    const taxFee = await client.s_Tax_Fee.create({ data: dto });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'CREATE_TAX_FEE',
      taxFee,
    );

    return taxFee;
  }

  async findAllTaxFees(dbName: string, workplaceId?: string) {
    const client = await this.tenantService.getClient(dbName);

    let idAutomatedPoint: string | null = null;
    if (workplaceId) {
      const workplace = await client.a_Workplace.findFirst({
        where: { id: workplaceId, is_deleted: false },
      });
      if (workplace) {
        idAutomatedPoint = workplace.automated_point_id;
      }
    }

    const where: any = { is_deleted: false };
    if (idAutomatedPoint) {
      where.OR = [
        { id_automated_point: idAutomatedPoint },
        { id_automated_point: '0' },
        { id_automated_point: null },
      ];
    }

    return client.s_Tax_Fee.findMany({ where });
  }

  async findOneTaxFee(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Tax_Fee.findFirst({ where: { id, is_deleted: false } });
  }

  async updateTaxFee(
    dbName: string,
    userId: string,
    id: string,
    dto: UpdateTaxFeeDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    const taxFee = await client.s_Tax_Fee.update({ where: { id }, data: dto });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'UPDATE_TAX_FEE',
      taxFee,
    );

    return taxFee;
  }

  async removeTaxFee(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Tax_Fee.update({
      where: { id },
      data: { is_deleted: true },
    });
  }

  // Discount
  async createDiscount(dbName: string, userId: string, dto: CreateDiscountDto) {
    const client = await this.tenantService.getClient(dbName);
    const discount = await client.s_Discount.create({ data: dto });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'CREATE_DISCOUNT',
      discount,
    );

    return discount;
  }

  async findAllDiscounts(dbName: string, workplaceId?: string) {
    const client = await this.tenantService.getClient(dbName);

    let idAutomatedPoint: string | null = null;
    if (workplaceId) {
      const workplace = await client.a_Workplace.findFirst({
        where: { id: workplaceId, is_deleted: false },
      });
      if (workplace) {
        idAutomatedPoint = workplace.automated_point_id;
      }
    }

    const where: any = { is_deleted: false };
    if (idAutomatedPoint) {
      where.OR = [
        { id_automated_point: idAutomatedPoint },
        { id_automated_point: '0' },
        { id_automated_point: null },
      ];
    }

    return client.s_Discount.findMany({ where });
  }

  async findOneDiscount(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Discount.findFirst({ where: { id, is_deleted: false } });
  }

  async updateDiscount(
    dbName: string,
    userId: string,
    id: string,
    dto: UpdateDiscountDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    const discount = await client.s_Discount.update({
      where: { id },
      data: dto,
    });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'UPDATE_DISCOUNT',
      discount,
    );

    return discount;
  }

  async removeDiscount(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Discount.update({
      where: { id },
      data: { is_deleted: true },
    });
  }
}
