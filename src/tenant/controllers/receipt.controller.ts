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
import { CreateReceiptDto, UpdateReceiptDto } from '../dto/inventarization.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('receipt')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN')
export class ReceiptController {
  constructor(private readonly service: InventarizationService) {}

  @Post('create')
  create(@Request() req, @Body() dto: CreateReceiptDto) {
    return this.service.createReceipt(req.user.dbName, dto);
  }

  @Get('all')
  findAll(@Request() req) {
    return this.service.findAllReceipts(req.user.dbName);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.service.findOneReceipt(req.user.dbName, id);
  }

  @Patch('update/:id')
  update(@Request() req, @Param('id') id: string, @Body() dto: UpdateReceiptDto) {
    return this.service.updateReceipt(req.user.dbName, id, dto);
  }

  @Delete('delete/:id')

  remove(@Request() req, @Param('id') id: string) {
    return this.service.removeReceipt(req.user.dbName, id);
  }
}
