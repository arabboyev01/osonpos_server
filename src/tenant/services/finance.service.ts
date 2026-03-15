import { Injectable } from '@nestjs/common';
import { TenantService } from '../tenant.service';
import { 
  CreateTaxFeeDto, UpdateTaxFeeDto,
  CreateDiscountDto, UpdateDiscountDto
} from '../dto/finance.dto';

@Injectable()
export class FinanceService {
  constructor(private tenantService: TenantService) {}

  // Tax & Fee
  async createTaxFee(dbName: string, dto: CreateTaxFeeDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Tax_Fee.create({ data: dto });
  }

  async findAllTaxFees(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Tax_Fee.findMany({ where: { is_deleted: false } });
  }

  async findOneTaxFee(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Tax_Fee.findFirst({ where: { id, is_deleted: false } });
  }

  async updateTaxFee(dbName: string, id: string, dto: UpdateTaxFeeDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Tax_Fee.update({ where: { id }, data: dto });
  }

  async removeTaxFee(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Tax_Fee.update({ where: { id }, data: { is_deleted: true } });
  }

  // Discount
  async createDiscount(dbName: string, dto: CreateDiscountDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Discount.create({ data: dto });
  }

  async findAllDiscounts(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Discount.findMany({ where: { is_deleted: false } });
  }

  async findOneDiscount(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Discount.findFirst({ where: { id, is_deleted: false } });
  }

  async updateDiscount(dbName: string, id: string, dto: UpdateDiscountDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Discount.update({ where: { id }, data: dto });
  }

  async removeDiscount(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Discount.update({ where: { id }, data: { is_deleted: true } });
  }
}
