import { Injectable } from '@nestjs/common';
import { TenantService } from '../tenant.service';
import { CreateLogDto, QueryLogDto } from '../dto/log.dto';

@Injectable()
export class LogService {
  constructor(private tenantService: TenantService) {}

  async create(dbName: string, dto: CreateLogDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Logs.create({ data: dto });
  }

  async recordLog(
    dbName: string,
    userId: string,
    type: string,
    action: string,
    details: any,
  ) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Logs.create({
      data: {
        user_id: userId,
        type: type as any,
        action,
        details: JSON.stringify(details),
      },
    });
  }

  async findAll(dbName: string, query?: QueryLogDto) {
    const client = await this.tenantService.getClient(dbName);
    const { user_id, type, action, from_date, to_date, limit, offset } =
      query || {};

    const where: any = { is_deleted: false };

    if (user_id) where.user_id = user_id;
    if (type) where.type = type;
    if (action) {
      where.action = { contains: action, mode: 'insensitive' };
    }

    if (from_date || to_date) {
      where.dt_created = {};
      if (from_date) where.dt_created.gte = new Date(from_date);
      if (to_date) where.dt_created.lte = new Date(to_date);
    }

    return client.s_Logs.findMany({
      where,
      orderBy: { dt_created: 'desc' },
      take: limit ? parseInt(limit) : 100,
      skip: offset ? parseInt(offset) : 0,
    });
  }
}
