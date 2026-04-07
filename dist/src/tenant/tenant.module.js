"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantModule = void 0;
const common_1 = require("@nestjs/common");
const tenant_service_1 = require("./tenant.service");
const employee_service_1 = require("./services/employee.service");
const employee_controller_1 = require("./controllers/employee.controller");
const business_service_1 = require("./services/business.service");
const business_controller_1 = require("./controllers/business.controller");
const item_modifier_service_1 = require("./services/item-modifier.service");
const item_modifier_controller_1 = require("./controllers/item-modifier.controller");
const finance_service_1 = require("./services/finance.service");
const finance_controller_1 = require("./controllers/finance.controller");
const order_service_1 = require("./services/order.service");
const order_controller_1 = require("./controllers/order.controller");
const log_service_1 = require("./services/log.service");
const log_controller_1 = require("./controllers/log.controller");
const employee_role_service_1 = require("./services/employee-role.service");
const employee_role_controller_1 = require("./controllers/employee-role.controller");
const query_service_1 = require("./services/query.service");
const query_controller_1 = require("./controllers/query.controller");
const measurement_service_1 = require("./services/measurement.service");
const measurement_controller_1 = require("./controllers/measurement.controller");
const payment_method_service_1 = require("./services/payment-method.service");
const payment_method_controller_1 = require("./controllers/payment-method.controller");
const inventarization_service_1 = require("./services/inventarization.service");
const inventory_controller_1 = require("./controllers/inventory.controller");
const receipt_controller_1 = require("./controllers/receipt.controller");
const write_off_controller_1 = require("./controllers/write-off.controller");
const warehouse_controller_1 = require("./controllers/warehouse.controller");
const supplier_controller_1 = require("./controllers/supplier.controller");
const movement_controller_1 = require("./controllers/movement.controller");
const stock_quantity_controller_1 = require("./controllers/stock-quantity.controller");
const base_config_service_1 = require("./services/base-config.service");
const base_config_controller_1 = require("./controllers/base-config.controller");
const client_service_1 = require("./services/client.service");
const client_controller_1 = require("./controllers/client.controller");
const settlment_service_1 = require("./services/settlment.service");
const settlment_controller_1 = require("./controllers/settlment.controller");
let TenantModule = class TenantModule {
};
exports.TenantModule = TenantModule;
exports.TenantModule = TenantModule = __decorate([
    (0, common_1.Module)({
        providers: [
            tenant_service_1.TenantService,
            employee_service_1.EmployeeService,
            business_service_1.BusinessService,
            item_modifier_service_1.ItemModifierService,
            finance_service_1.FinanceService,
            order_service_1.OrderService,
            log_service_1.LogService,
            employee_role_service_1.EmployeeRoleService,
            query_service_1.QueryService,
            measurement_service_1.MeasurementService,
            payment_method_service_1.PaymentMethodService,
            inventarization_service_1.InventarizationService,
            base_config_service_1.BaseConfigService,
            client_service_1.ClientService,
            settlment_service_1.SettlmentService,
        ],
        controllers: [
            employee_controller_1.EmployeeController,
            business_controller_1.BusinessController,
            item_modifier_controller_1.ItemModifierController,
            finance_controller_1.FinanceController,
            order_controller_1.OrderController,
            log_controller_1.LogController,
            employee_role_controller_1.EmployeeRoleController,
            query_controller_1.QueryController,
            measurement_controller_1.MeasurementController,
            payment_method_controller_1.PaymentMethodController,
            inventory_controller_1.InventoryController,
            receipt_controller_1.ReceiptController,
            write_off_controller_1.WriteOffController,
            warehouse_controller_1.WarehouseController,
            supplier_controller_1.SupplierController,
            movement_controller_1.MovementController,
            stock_quantity_controller_1.StockQuantityController,
            base_config_controller_1.BaseConfigController,
            client_controller_1.ClientController,
            settlment_controller_1.SettlmentController,
        ],
        exports: [
            tenant_service_1.TenantService,
            log_service_1.LogService,
            payment_method_service_1.PaymentMethodService,
            inventarization_service_1.InventarizationService,
        ],
    })
], TenantModule);
//# sourceMappingURL=tenant.module.js.map