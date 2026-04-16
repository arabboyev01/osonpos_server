import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantService } from '../tenant.service';
import {
  CreateClientDebtDto,
  UpdateClientDebtDto,
  CreateClientDebtTransactionDto,
} from '../dto/client-debt.dto';
import { LogService } from './log.service';

@Injectable()
export class ClientDebtService {
  constructor(
    private tenantService: TenantService,
    private logService: LogService,
  ) {}

  async createDebt(dbName: string, userId: string, dto: CreateClientDebtDto) {
    const client = await this.tenantService.getClient(dbName);
    const newDebt = await client.s_Client_Debt.create({
      data: dto,
    });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'CREATE_CLIENT_DEBT',
      newDebt,
    );

    return newDebt;
  }

  async findAllDebts(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Client_Debt.findMany({
      where: { is_deleted: false },
      orderBy: { dt_created: 'desc' },
    });
  }

  async findOneDebt(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    const result = await client.s_Client_Debt.findFirst({
      where: { id, is_deleted: false },
    });
    if (!result) {
      throw new NotFoundException(`Debt with ID ${id} not found`);
    }
    return result;
  }

  async updateDebt(
    dbName: string,
    userId: string,
    id: string,
    dto: UpdateClientDebtDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    await this.findOneDebt(dbName, id);

    const updatedDebt = await client.s_Client_Debt.update({
      where: { id },
      data: dto,
    });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'UPDATE_CLIENT_DEBT',
      updatedDebt,
    );

    return updatedDebt;
  }

  async removeDebt(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    await this.findOneDebt(dbName, id);

    return client.s_Client_Debt.update({
      where: { id },
      data: { is_deleted: true },
    });
  }

  // Transactions
  async createTransaction(
    dbName: string,
    userId: string,
    dto: CreateClientDebtTransactionDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    const newTransaction = await client.s_Client_Debt_Transaction.create({
      data: dto,
    });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'CREATE_CLIENT_DEBT_TRANSACTION',
      newTransaction,
    );

    return newTransaction;
  }

  async findAllTransactions(dbName: string, clientId?: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Client_Debt_Transaction.findMany({
      where: {
        is_deleted: false,
        ...(clientId && { client_id: clientId }),
      },
      orderBy: { dt_created: 'desc' },
    });
  }
}
