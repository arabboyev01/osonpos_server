import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TenantService } from '../tenant.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private tenantService: TenantService) { }

  async create(dbName: string, dto: CreateEmployeeDto) {
    const client = await this.tenantService.getClient(dbName);

    // Check for password uniqueness
    const existing = await client.s_Employee.findFirst({
      where: { password: dto.password, is_deleted: false },
    });
    if (existing) {
      throw new BadRequestException(
        'Ushbu PIN kod allaqachon boshqa xodimga biriktirilgan'
      );
    }

    const employee = await client.s_Employee.create({
      data: {
        ...dto,
      },
    });
    const { password, ...result } = employee;
    return result;
  }

  async findAll(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    const employees = await client.s_Employee.findMany({
      where: { is_deleted: false },
    });
    return employees.map(({ password, ...rest }) => rest);
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
      // Check for password uniqueness excluding current employee
      const existing = await client.s_Employee.findFirst({
        where: {
          password: dto.password,
          is_deleted: false,
          id: { not: id },
        },
      });
      if (existing) {
        throw new BadRequestException(
          'Ushbu PIN kod allaqachon boshqa xodimga biriktirilgan'
        );
      }
    }

    const employee = await client.s_Employee.update({
      where: { id },
      data: updateData,
    });
    return employee;
  }

  async remove(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    const employee = await client.s_Employee.update({
      where: { id },
      data: { is_deleted: true },
    });
    const { password, ...result } = employee;
    return result;
  }
}
