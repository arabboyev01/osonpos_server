import { Injectable } from '@nestjs/common';
import { TenantService } from '../tenant.service';
import {
  CreateMeasurementDto,
  UpdateMeasurementDto,
} from '../dto/measurement.dto';

@Injectable()
export class MeasurementService {
  constructor(private tenantService: TenantService) {}

  async createMeasurement(dbName: string, dto: CreateMeasurementDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Measurement.create({ data: dto });
  }

  async findAllMeasurements(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Measurement.findMany({ where: { is_deleted: false } });
  }

  async findOneMeasurement(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Measurement.findFirst({ where: { id, is_deleted: false } });
  }

  async updateMeasurement(
    dbName: string,
    id: string,
    dto: UpdateMeasurementDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Measurement.update({ where: { id }, data: dto });
  }

  async removeMeasurement(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Measurement.update({
      where: { id },
      data: { is_deleted: true },
    });
  }
}
