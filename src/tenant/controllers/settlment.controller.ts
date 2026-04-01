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
import { SettlmentService } from '../services/settlment.service';
import { CreateSettlmentDto, UpdateSettlmentDto } from '../dto/settlment.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('settlements')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN')
export class SettlmentController {
  constructor(private readonly service: SettlmentService) {}

  @Post('create')
  create(@Request() req, @Body() dto: CreateSettlmentDto) {
    return this.service.create(req.user.dbName, req.user.id, dto);
  }

  @Get('all')
  findAll(@Request() req) {
    return this.service.findAll(req.user.dbName);
  }

  @Get('latest')
  findLatest(@Request() req) {
    return this.service.findLatest(req.user.dbName);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.service.findOne(req.user.dbName, id);
  }

  @Patch('update/:id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateSettlmentDto,
  ) {
    return this.service.update(req.user.dbName, req.user.id, id, dto);
  }

  @Delete('delete/:id')
  remove(@Request() req, @Param('id') id: string) {
    return this.service.remove(req.user.dbName, id);
  }
}
