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
import { BaseConfigService } from '../services/base-config.service';
import {
  CreateBaseConfigDto,
  UpdateBaseConfigDto,
} from '../dto/base-config.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('base-config')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN')
export class BaseConfigController {
  constructor(private readonly baseConfigService: BaseConfigService) {}

  @Post('create')
  create(@Request() req, @Body() dto: CreateBaseConfigDto) {
    return this.baseConfigService.create(req.user.dbName, dto);
  }

  @Get('all')
  findAll(@Request() req) {
    return this.baseConfigService.findAll(req.user.dbName);
  }

  @Get('key/:key')
  findByKey(@Request() req, @Param('key') key: string) {
    return this.baseConfigService.findByKey(req.user.dbName, key);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.baseConfigService.findOne(req.user.dbName, id);
  }

  @Patch('update/:id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateBaseConfigDto,
  ) {
    return this.baseConfigService.update(req.user.dbName, id, dto);
  }

  @Delete('delete/:id')
  remove(@Request() req, @Param('id') id: string) {
    return this.baseConfigService.remove(req.user.dbName, id);
  }
}
