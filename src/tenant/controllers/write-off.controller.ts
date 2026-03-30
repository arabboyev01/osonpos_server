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
  CreateCancellationDto,
  UpdateCancellationDto,
} from '../dto/inventarization.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('write-off')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN')
export class WriteOffController {
  constructor(private readonly service: InventarizationService) {}

  @Post('create')
  create(@Request() req, @Body() dto: CreateCancellationDto) {
    return this.service.createCancellation(req.user.dbName, dto);
  }

  @Get('all')
  findAll(@Request() req) {
    return this.service.findAllCancellations(req.user.dbName);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.service.findOneCancellation(req.user.dbName, id);
  }

  @Patch('update/:id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateCancellationDto,
  ) {
    return this.service.updateCancellation(req.user.dbName, id, dto);
  }

  @Delete('delete/:id')
  remove(@Request() req, @Param('id') id: string) {
    return this.service.removeCancellation(req.user.dbName, id);
  }
}
