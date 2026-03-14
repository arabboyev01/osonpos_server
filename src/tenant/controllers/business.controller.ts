import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BusinessService } from '../services/business.service';
import { 
  CreateAutomatedPointDto, UpdateAutomatedPointDto,
  CreateWorkplaceDto, UpdateWorkplaceDto,
  CreatePrinterDto, UpdatePrinterDto,
  CreatePaymentDeviceDto, UpdatePaymentDeviceDto
} from '../dto/business.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('business-config')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  // Automated Points
  @Post('points/create')
  createPoint(@Request() req, @Body() dto: CreateAutomatedPointDto) {
    return this.businessService.createPoint(req.user.dbName, dto);
  }

  @Get('points/all')
  findAllPoints(@Request() req) {
    return this.businessService.findAllPoints(req.user.dbName);
  }

  @Patch('points/update/:id')
  updatePoint(@Request() req, @Param('id') id: string, @Body() dto: UpdateAutomatedPointDto) {
    return this.businessService.updatePoint(req.user.dbName, id, dto);
  }

  @Delete('points/delete/:id')
  removePoint(@Request() req, @Param('id') id: string) {
    return this.businessService.removePoint(req.user.dbName, id);
  }

  // Workplaces
  @Post('workplaces/create')
  createWorkplace(@Request() req, @Body() dto: CreateWorkplaceDto) {
    return this.businessService.createWorkplace(req.user.dbName, dto);
  }

  @Get('workplaces/all')
  findAllWorkplaces(@Request() req) {
    return this.businessService.findAllWorkplaces(req.user.dbName);
  }

  @Patch('workplaces/update/:id')
  updateWorkplace(@Request() req, @Param('id') id: string, @Body() dto: UpdateWorkplaceDto) {
    return this.businessService.updateWorkplace(req.user.dbName, id, dto);
  }

  @Delete('workplaces/delete/:id')
  removeWorkplace(@Request() req, @Param('id') id: string) {
    return this.businessService.removeWorkplace(req.user.dbName, id);
  }

  // Printers
  @Post('printers/create')
  createPrinter(@Request() req, @Body() dto: CreatePrinterDto) {
    return this.businessService.createPrinter(req.user.dbName, dto);
  }

  @Get('printers/all')
  findAllPrinters(@Request() req) {
    return this.businessService.findAllPrinters(req.user.dbName);
  }

  @Patch('printers/update/:id')
  updatePrinter(@Request() req, @Param('id') id: string, @Body() dto: UpdatePrinterDto) {
    return this.businessService.updatePrinter(req.user.dbName, id, dto);
  }

  @Delete('printers/delete/:id')
  removePrinter(@Request() req, @Param('id') id: string) {
    return this.businessService.removePrinter(req.user.dbName, id);
  }

  // Payment Devices
  @Post('payment-devices/create')
  createPaymentDevice(@Request() req, @Body() dto: CreatePaymentDeviceDto) {
    return this.businessService.createPaymentDevice(req.user.dbName, dto);
  }

  @Get('payment-devices/all')
  findAllPaymentDevices(@Request() req) {
    return this.businessService.findAllPaymentDevices(req.user.dbName);
  }

  @Patch('payment-devices/update/:id')
  updatePaymentDevice(@Request() req, @Param('id') id: string, @Body() dto: UpdatePaymentDeviceDto) {
    return this.businessService.updatePaymentDevice(req.user.dbName, id, dto);
  }

  @Delete('payment-devices/delete/:id')
  removePaymentDevice(@Request() req, @Param('id') id: string) {
    return this.businessService.removePaymentDevice(req.user.dbName, id);
  }
}
