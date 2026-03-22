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
import { CreateInventoryDto, UpdateInventoryDto } from '../dto/inventarization.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN')
export class InventoryController {
  constructor(private readonly service: InventarizationService) {}

  @Post('create')
  create(@Request() req, @Body() dto: CreateInventoryDto) {
    return this.service.createInventory(req.user.dbName, dto);
  }

  @Get('all')
  findAll(@Request() req) {
    return this.service.findAllInventories(req.user.dbName);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.service.findOneInventory(req.user.dbName, id);
  }

  @Patch('update/:id')
  update(@Request() req, @Param('id') id: string, @Body() dto: UpdateInventoryDto) {
    return this.service.updateInventory(req.user.dbName, id, dto);
  }

  @Delete('delete/:id')

  remove(@Request() req, @Param('id') id: string) {
    return this.service.removeInventory(req.user.dbName, id);
  }
}
