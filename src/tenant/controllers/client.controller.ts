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
import { ClientService } from '../services/client.service';
import { CreateClientDto, UpdateClientDto } from '../dto/client.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('clients')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN')
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @Post('create')
  create(@Request() req, @Body() dto: CreateClientDto) {
    return this.service.create(req.user.dbName, dto);
  }

  @Get('all')
  findAll(@Request() req) {
    return this.service.findAll(req.user.dbName);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.service.findOne(req.user.dbName, id);
  }

  @Patch('update/:id')
  update(@Request() req, @Param('id') id: string, @Body() dto: UpdateClientDto) {
    return this.service.update(req.user.dbName, id, dto);
  }

  @Delete('delete/:id')
  remove(@Request() req, @Param('id') id: string) {
    return this.service.remove(req.user.dbName, id);
  }
}
