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
import { FinanceService } from '../services/finance.service';
import {
  CreateTaxFeeDto,
  UpdateTaxFeeDto,
  CreateDiscountDto,
  UpdateDiscountDto,
} from '../dto/finance.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('finance')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN', 'EMPLOYEE')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  // Tax & Fees
  @Post('taxes/create')
  createTaxFee(@Request() req, @Body() dto: CreateTaxFeeDto) {
    return this.financeService.createTaxFee(req.user.dbName, req.user.id, dto);
  }

  @Get('taxes/all')
  findAllTaxFees(@Request() req) {
    return this.financeService.findAllTaxFees(
      req.user.dbName,
      req.user.workplaceId,
    );
  }

  @Patch('taxes/update/:id')
  updateTaxFee(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateTaxFeeDto,
  ) {
    return this.financeService.updateTaxFee(
      req.user.dbName,
      req.user.id,
      id,
      dto,
    );
  }

  @Delete('taxes/delete/:id')
  removeTaxFee(@Request() req, @Param('id') id: string) {
    return this.financeService.removeTaxFee(req.user.dbName, id);
  }

  // Discounts
  @Post('discounts/create')
  createDiscount(@Request() req, @Body() dto: CreateDiscountDto) {
    return this.financeService.createDiscount(
      req.user.dbName,
      req.user.id,
      dto,
    );
  }

  @Get('discounts/all')
  findAllDiscounts(@Request() req) {
    return this.financeService.findAllDiscounts(
      req.user.dbName,
      req.user.workplaceId,
    );
  }

  @Patch('discounts/update/:id')
  updateDiscount(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateDiscountDto,
  ) {
    return this.financeService.updateDiscount(
      req.user.dbName,
      req.user.id,
      id,
      dto,
    );
  }

  @Delete('discounts/delete/:id')
  removeDiscount(@Request() req, @Param('id') id: string) {
    return this.financeService.removeDiscount(req.user.dbName, id);
  }
}
