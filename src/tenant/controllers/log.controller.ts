import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { LogService } from '../services/log.service';
import { CreateLogDto } from '../dto/log.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('logs')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post('create')
  create(@Request() req, @Body() dto: CreateLogDto) {
    return this.logService.create(req.user.dbName, dto);
  }

  @Get('all')
  findAll(@Request() req) {
    return this.logService.findAll(req.user.dbName);
  }
}
