import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantService } from '../tenant.service';
import {
  CreateAutomatedPointDto,
  UpdateAutomatedPointDto,
  CreateWorkplaceDto,
  UpdateWorkplaceDto,
  CreatePrinterDto,
  UpdatePrinterDto,
  CreatePaymentDeviceDto,
  UpdatePaymentDeviceDto,
} from '../dto/business.dto';

@Injectable()
export class BusinessService {
  constructor(private tenantService: TenantService) {}

  // Automated Point
  async createPoint(dbName: string, dto: CreateAutomatedPointDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.a_Automated_Point.create({ data: dto });
  }

  async findAllPoints(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.a_Automated_Point.findMany({ where: { is_deleted: false } });
  }

  async findOnePoint(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.a_Automated_Point.findFirst({
      where: { id, is_deleted: false },
    });
  }

  async updatePoint(dbName: string, id: string, dto: UpdateAutomatedPointDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.a_Automated_Point.update({ where: { id }, data: dto });
  }

  async removePoint(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.a_Automated_Point.update({
      where: { id },
      data: { is_deleted: true },
    });
  }

  // Workplace
  async createWorkplace(dbName: string, dto: CreateWorkplaceDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.a_Workplace.create({ data: dto });
  }

  async findAllWorkplaces(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.a_Workplace.findMany({ where: { is_deleted: false } });
  }

  async findOneWorkplace(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.a_Workplace.findFirst({ where: { id, is_deleted: false } });
  }

  async updateWorkplace(dbName: string, id: string, dto: UpdateWorkplaceDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.a_Workplace.update({ where: { id }, data: dto });
  }

  async removeWorkplace(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.a_Workplace.update({
      where: { id },
      data: { is_deleted: true },
    });
  }

  // Printer
  async createPrinter(dbName: string, dto: CreatePrinterDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Printer.create({ data: dto });
  }

  async findAllPrinters(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Printer.findMany({ where: { is_deleted: false } });
  }

  async findOnePrinter(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Printer.findFirst({ where: { id, is_deleted: false } });
  }

  async updatePrinter(dbName: string, id: string, dto: UpdatePrinterDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Printer.update({ where: { id }, data: dto });
  }

  async removePrinter(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Printer.update({
      where: { id },
      data: { is_deleted: true },
    });
  }

  // Payment Device
  async createPaymentDevice(dbName: string, dto: CreatePaymentDeviceDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Payment_Devices.create({ data: dto });
  }

  async findAllPaymentDevices(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Payment_Devices.findMany({ where: { is_deleted: false } });
  }

  async findOnePaymentDevice(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Payment_Devices.findFirst({
      where: { id, is_deleted: false },
    });
  }

  async updatePaymentDevice(
    dbName: string,
    id: string,
    dto: UpdatePaymentDeviceDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Payment_Devices.update({ where: { id }, data: dto });
  }

  async removePaymentDevice(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Payment_Devices.update({
      where: { id },
      data: { is_deleted: true },
    });
  }
}
