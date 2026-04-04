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
import { PaymentMethodService } from '../services/payment-method.service';
import {
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
} from '../dto/payment-method.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('payment-methods')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN', 'EMPLOYEE')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Post('create')
  create(@Request() req, @Body() dto: CreatePaymentMethodDto) {
    return this.paymentMethodService.create(req.user.dbName, req.user.id, dto);
  }

  @Get('all')
  findAll(@Request() req) {
    return this.paymentMethodService.findAll(req.user.dbName);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.paymentMethodService.findOne(req.user.dbName, id);
  }

  @Patch('update/:id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdatePaymentMethodDto,
  ) {
    return this.paymentMethodService.update(
      req.user.dbName,
      req.user.id,
      id,
      dto,
    );
  }

  @Delete('delete/:id')
  remove(@Request() req, @Param('id') id: string) {
    return this.paymentMethodService.remove(req.user.dbName, id);
  }
}
