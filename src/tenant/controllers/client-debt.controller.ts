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
  Query,
} from '@nestjs/common';
import { ClientDebtService } from '../services/client-debt.service';
import {
  CreateClientDebtDto,
  UpdateClientDebtDto,
  CreateClientDebtTransactionDto,
} from '../dto/client-debt.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('client-debts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN', 'EMPLOYEE')
export class ClientDebtController {
  constructor(private readonly service: ClientDebtService) {}

  @Post('create')
  createDebt(@Request() req, @Body() dto: CreateClientDebtDto) {
    return this.service.createDebt(req.user.dbName, req.user.id, dto);
  }

  @Get('all')
  findAllDebts(@Request() req) {
    return this.service.findAllDebts(req.user.dbName);
  }

  @Get(':id')
  findOneDebt(@Request() req, @Param('id') id: string) {
    return this.service.findOneDebt(req.user.dbName, id);
  }

  @Patch('update/:id')
  updateDebt(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateClientDebtDto,
  ) {
    return this.service.updateDebt(req.user.dbName, req.user.id, id, dto);
  }

  @Delete('delete/:id')
  removeDebt(@Request() req, @Param('id') id: string) {
    return this.service.removeDebt(req.user.dbName, id);
  }

  // Transactions
  @Post('transactions/create')
  createTransaction(@Request() req, @Body() dto: CreateClientDebtTransactionDto) {
    return this.service.createTransaction(req.user.dbName, req.user.id, dto);
  }

  @Get('transactions/all')
  findAllTransactions(@Request() req, @Query('client_id') clientId?: string) {
    return this.service.findAllTransactions(req.user.dbName, clientId);
  }
}
