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
import { CreateMovementDto, UpdateMovementDto } from '../dto/inventarization.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('movement')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN')
export class MovementController {
  constructor(private readonly service: InventarizationService) {}

  @Post('create')
  create(@Request() req, @Body() dto: CreateMovementDto) {
    return this.service.createMovement(req.user.dbName, dto);
  }

  @Get('all')
  findAll(@Request() req) {
    return this.service.findAllMovements(req.user.dbName);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.service.findOneMovement(req.user.dbName, id);
  }

  @Patch('update/:id')
  update(@Request() req, @Param('id') id: string, @Body() dto: UpdateMovementDto) {
    return this.service.updateMovement(req.user.dbName, id, dto);
  }

  @Delete('delete/:id')

  remove(@Request() req, @Param('id') id: string) {
    return this.service.removeMovement(req.user.dbName, id);
  }
}
