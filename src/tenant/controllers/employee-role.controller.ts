import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { EmployeeRoleService } from '../services/employee-role.service';
import {
  CreateEmployeeRoleDto,
  UpdateEmployeeRoleDto,
} from '../dto/employee.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('employee-role')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN')
export class EmployeeRoleController {
  constructor(private readonly roleService: EmployeeRoleService) {}

  @Post('create')
  create(@Request() req, @Body() dto: CreateEmployeeRoleDto) {
    return this.roleService.create(req.user.dbName, dto);
  }

  @Get('all')
  findAll(@Request() req) {
    return this.roleService.findAll(req.user.dbName);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.roleService.findOne(req.user.dbName, id);
  }

  @Patch('update/:id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateEmployeeRoleDto,
  ) {
    return this.roleService.update(req.user.dbName, id, dto);
  }

  @Delete('delete/:id')
  remove(@Request() req, @Param('id') id: string) {
    return this.roleService.remove(req.user.dbName, id);
  }
}
