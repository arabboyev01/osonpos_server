import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantService } from '../tenant.service';
import {
  CreateBaseConfigDto,
  UpdateBaseConfigDto,
} from '../dto/base-config.dto';

@Injectable()
export class BaseConfigService {
  constructor(private tenantService: TenantService) {}

  async create(dbName: string, dto: CreateBaseConfigDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Base_Config.create({ data: dto });
  }

  async findAll(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Base_Config.findMany({ where: { is_deleted: false } });
  }

  async findOne(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    const config = await client.s_Base_Config.findFirst({
      where: { id, is_deleted: false },
    });
    if (!config) throw new NotFoundException('Configuration not found');
    return config;
  }

  async findByKey(dbName: string, key: string) {
    const client = await this.tenantService.getClient(dbName);
    const config = await client.s_Base_Config.findFirst({
      where: { key_name: key, is_deleted: false },
    });
    if (!config)
      throw new NotFoundException(`Configuration with key "${key}" not found`);
    return config;
  }

  async update(dbName: string, id: string, dto: UpdateBaseConfigDto) {
    const client = await this.tenantService.getClient(dbName);
    // Explicitly check if it exists before updating or use update directly
    return client.s_Base_Config.update({ where: { id }, data: dto });
  }

  async remove(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Base_Config.update({
      where: { id },
      data: { is_deleted: true },
    });
  }
}
