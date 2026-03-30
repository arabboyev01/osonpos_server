import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantService } from '../tenant.service';
import { CreateSettlmentDto, UpdateSettlmentDto } from '../dto/settlment.dto';

@Injectable()
export class SettlmentService {
  constructor(private tenantService: TenantService) {}

  async create(dbName: string, dto: CreateSettlmentDto) {
    const db = await this.tenantService.getClient(dbName);
    return db.s_Settlments.create({
      data: {
        ...dto,
        dt_closed: dto.dt_closed ? new Date(dto.dt_closed) : null,
      },
    });
  }

  async findAll(dbName: string) {
    const db = await this.tenantService.getClient(dbName);
    return db.s_Settlments.findMany({
      where: { is_deleted: false },
      orderBy: { dt_created: 'desc' },
    });
  }

  async findOne(dbName: string, id: string) {
    const db = await this.tenantService.getClient(dbName);
    const result = await db.s_Settlments.findFirst({
      where: { id, is_deleted: false },
    });
    if (!result) {
      throw new NotFoundException(`Settlement with ID ${id} not found`);
    }
    return result;
  }

  async findLatest(dbName: string) {
    const db = await this.tenantService.getClient(dbName);
    const result = await db.s_Settlments.findFirst({
      where: {
        is_deleted: false,
      },
      orderBy: {
        dt_created: 'desc',
      },
    });
    return result;
  }

  async update(dbName: string, id: string, dto: UpdateSettlmentDto) {
    const db = await this.tenantService.getClient(dbName);
    await this.findOne(dbName, id);

    return db.s_Settlments.update({
      where: { id },
      data: {
        ...dto,
        dt_closed: dto.dt_closed ? new Date(dto.dt_closed) : undefined,
      },
    });
  }

  async remove(dbName: string, id: string) {
    const db = await this.tenantService.getClient(dbName);
    await this.findOne(dbName, id);

    return db.s_Settlments.update({
      where: { id },
      data: { is_deleted: true },
    });
  }
}
