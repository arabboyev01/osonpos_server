import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantService } from '../tenant.service';
import { CreateClientDto, UpdateClientDto } from '../dto/client.dto';

@Injectable()
export class ClientService {
  constructor(private tenantService: TenantService) {}

  async create(dbName: string, dto: CreateClientDto) {
    const client = await this.tenantService.getClient(dbName);
    const data = {
      ...dto,
      birthday: this.transformDate(dto.birthday),
    };
    return client.s_Clients.create({
      data,
    });
  }

  async findAll(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Clients.findMany({
      where: { is_deleted: false },
      orderBy: { dt_created: 'desc' },
    });
  }

  async findOne(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    const result = await client.s_Clients.findFirst({
      where: { id, is_deleted: false },
    });
    if (!result) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return result;
  }

  async update(dbName: string, id: string, dto: UpdateClientDto) {
    const client = await this.tenantService.getClient(dbName);
    // Check if exists
    await this.findOne(dbName, id);

    const data = {
      ...dto,
      birthday: this.transformDate(dto.birthday),
    };

    return client.s_Clients.update({
      where: { id },
      data,
    });
  }

  private transformDate(dateStr?: string): Date | undefined {
    if (!dateStr || dateStr.trim() === '') return undefined;
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? undefined : date;
  }

  async remove(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    // Check if exists
    await this.findOne(dbName, id);

    return client.s_Clients.update({
      where: { id },
      data: { is_deleted: true },
    });
  }
}
