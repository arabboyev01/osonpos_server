import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantService } from '../tenant.service';
import {
  CreateEmployeeRoleDto,
  UpdateEmployeeRoleDto,
} from '../dto/employee.dto';

@Injectable()
export class EmployeeRoleService {
  constructor(private tenantService: TenantService) {}

  async create(dbName: string, dto: CreateEmployeeRoleDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Employee_Role.create({
      data: dto,
    });
  }

  async findAll(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Employee_Role.findMany({
      where: { is_deleted: false },
    });
  }

  async findOne(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    const role = await client.s_Employee_Role.findFirst({
      where: { id, is_deleted: false },
    });
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async update(dbName: string, id: string, dto: UpdateEmployeeRoleDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Employee_Role.update({
      where: { id },
      data: dto,
    });
  }

  async remove(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Employee_Role.update({
      where: { id },
      data: { is_deleted: true },
    });
  }
}
