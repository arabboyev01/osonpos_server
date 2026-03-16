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
import { MeasurementService } from '../services/measurement.service';
import {
  CreateMeasurementDto,
  UpdateMeasurementDto,
} from '../dto/measurement.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('measurements')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @Post('create')
  createMeasurement(@Request() req, @Body() dto: CreateMeasurementDto) {
    return this.measurementService.createMeasurement(req.user.dbName, dto);
  }

  @Get('all')
  findAllMeasurements(@Request() req) {
    return this.measurementService.findAllMeasurements(req.user.dbName);
  }

  @Patch('update/:id')
  updateMeasurement(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateMeasurementDto,
  ) {
    return this.measurementService.updateMeasurement(req.user.dbName, id, dto);
  }

  @Delete('delete/:id')
  removeMeasurement(@Request() req, @Param('id') id: string) {
    return this.measurementService.removeMeasurement(req.user.dbName, id);
  }
}
