import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantService } from '../tenant.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto/employee.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(private tenantService: TenantService) {}

  async create(dbName: string, dto: CreateEmployeeDto) {
    const client = await this.tenantService.getClient(dbName);
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return client.s_Employee.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
    });
  }

  async findAll(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Employee.findMany({
      where: { is_deleted: false },
    });
  }

  async findOne(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    const employee = await client.s_Employee.findFirst({
      where: { id, is_deleted: false },
    });
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async update(dbName: string, id: string, dto: UpdateEmployeeDto) {
    const client = await this.tenantService.getClient(dbName);
    const updateData: any = { ...dto };
    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10);
    }

    return client.s_Employee.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Employee.update({
      where: { id },
      data: { is_deleted: true },
    });
  }
}
