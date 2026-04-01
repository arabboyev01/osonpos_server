import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantService } from '../tenant.service';
import { CreateSettlmentDto, UpdateSettlmentDto } from '../dto/settlment.dto';

import { LogService } from './log.service';

@Injectable()
export class SettlmentService {
  constructor(
    private tenantService: TenantService,
    private logService: LogService,
  ) {}

  async create(dbName: string, userId: string, dto: CreateSettlmentDto) {
    const db = await this.tenantService.getClient(dbName);
    const settlement = await db.s_Settlments.create({
      data: {
        ...dto,
        dt_closed: dto.dt_closed ? new Date(dto.dt_closed) : null,
      },
    });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'CREATE_SETTLEMENT',
      settlement,
    );

    return settlement;
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

  async update(
    dbName: string,
    userId: string,
    id: string,
    dto: UpdateSettlmentDto,
  ) {
    const db = await this.tenantService.getClient(dbName);
    await this.findOne(dbName, id);

    const updatedSettlement = await db.s_Settlments.update({
      where: { id },
      data: {
        ...dto,
        dt_closed: dto.dt_closed ? new Date(dto.dt_closed) : undefined,
      },
    });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'UPDATE_SETTLEMENT',
      updatedSettlement,
    );

    return updatedSettlement;
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
