import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  create(@Request() req, @Body() dto: CreateOrderDto) {
    return this.orderService.create(req.user.dbName, dto);
  }

  @Post('update/:id')
  update(@Request() req, @Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.orderService.update(req.user.dbName, id, dto);
  }

  @Get('all')
  findAll(@Request() req) {
    return this.orderService.findAll(req.user.dbName);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.orderService.findOne(req.user.dbName, id);
  }

  @Delete('delete/:id')
  remove(@Request() req, @Param('id') id: string) {
    return this.orderService.remove(req.user.dbName, id);
  }
}
