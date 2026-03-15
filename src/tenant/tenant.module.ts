import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { EmployeeService } from './services/employee.service';
import { EmployeeController } from './controllers/employee.controller';
import { BusinessService } from './services/business.service';
import { BusinessController } from './controllers/business.controller';
import { InventoryService } from './services/inventory.service';
import { InventoryController } from './controllers/inventory.controller';
import { FinanceService } from './services/finance.service';
import { FinanceController } from './controllers/finance.controller';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { LogService } from './services/log.service';
import { LogController } from './controllers/log.controller';
import { EmployeeRoleService } from './services/employee-role.service';
import { EmployeeRoleController } from './controllers/employee-role.controller';
import { QueryService } from './services/query.service';
import { QueryController } from './controllers/query.controller';

@Module({
  providers: [
    TenantService,
    EmployeeService,
    BusinessService,
    InventoryService,
    FinanceService,
    OrderService,
    LogService,
    EmployeeRoleService,
    QueryService,
  ],
  controllers: [
    EmployeeController,
    BusinessController,
    InventoryController,
    FinanceController,
    OrderController,
    LogController,
    EmployeeRoleController,
    QueryController,
  ],
  exports: [TenantService],
})
export class TenantModule {}
