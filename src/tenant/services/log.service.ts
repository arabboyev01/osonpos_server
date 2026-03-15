import { Injectable } from '@nestjs/common';
import { TenantService } from '../tenant.service';
import { CreateLogDto } from '../dto/log.dto';

@Injectable()
export class LogService {
  constructor(private tenantService: TenantService) {}

  async create(dbName: string, dto: CreateLogDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Logs.create({ data: dto });
  }

  async findAll(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Logs.findMany({
      where: { is_deleted: false },
      orderBy: { dt_created: 'desc' },
      take: 100,
    });
  }
}
