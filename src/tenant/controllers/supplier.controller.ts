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
import { InventarizationService } from '../services/inventarization.service';
import {
  CreateSupplierDto,
  UpdateSupplierDto,
} from '../dto/inventarization.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('suppliers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN')
export class SupplierController {
  constructor(private readonly service: InventarizationService) {}

  @Post('create')
  create(@Request() req, @Body() dto: CreateSupplierDto) {
    return this.service.createSupplier(req.user.dbName, dto);
  }

  @Get('all')
  findAll(@Request() req) {
    return this.service.findAllSuppliers(req.user.dbName);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.service.findOneSupplier(req.user.dbName, id);
  }

  @Patch('update/:id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateSupplierDto,
  ) {
    return this.service.updateSupplier(req.user.dbName, id, dto);
  }

  @Delete('delete/:id')
  remove(@Request() req, @Param('id') id: string) {
    return this.service.removeSupplier(req.user.dbName, id);
  }
}
