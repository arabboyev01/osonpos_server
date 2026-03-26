import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { EmployeeService } from './services/employee.service';
import { EmployeeController } from './controllers/employee.controller';
import { BusinessService } from './services/business.service';
import { BusinessController } from './controllers/business.controller';
import { ItemModifierService } from './services/item-modifier.service';
import { ItemModifierController } from './controllers/item-modifier.controller';
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
import { MeasurementService } from './services/measurement.service';
import { MeasurementController } from './controllers/measurement.controller';
import { PaymentMethodService } from './services/payment-method.service';
import { PaymentMethodController } from './controllers/payment-method.controller';
import { InventarizationService } from './services/inventarization.service';
import { InventoryController } from './controllers/inventory.controller';
import { ReceiptController } from './controllers/receipt.controller';
import { WriteOffController } from './controllers/write-off.controller';
import { WarehouseController } from './controllers/warehouse.controller';
import { SupplierController } from './controllers/supplier.controller';
import { MovementController } from './controllers/movement.controller';
import { StockQuantityController } from './controllers/stock-quantity.controller';
import { BaseConfigService } from './services/base-config.service';
import { BaseConfigController } from './controllers/base-config.controller';
import { ClientService } from './services/client.service';
import { ClientController } from './controllers/client.controller';

@Module({
  providers: [
    TenantService,
    EmployeeService,
    BusinessService,
    ItemModifierService,
    FinanceService,
    OrderService,
    LogService,
    EmployeeRoleService,
    QueryService,
    MeasurementService,
    PaymentMethodService,
    InventarizationService,
    BaseConfigService,
    ClientService,
  ],
  controllers: [
    EmployeeController,
    BusinessController,
    ItemModifierController,
    FinanceController,
    OrderController,
    LogController,
    EmployeeRoleController,
    QueryController,
    MeasurementController,
    PaymentMethodController,
    InventoryController,
    ReceiptController,
    WriteOffController,
    WarehouseController,
    SupplierController,
    MovementController,
    StockQuantityController,
    BaseConfigController,
    ClientController,
  ],
  exports: [
    TenantService,
    LogService,
    PaymentMethodService,
    InventarizationService,
  ],
})
export class TenantModule {}

