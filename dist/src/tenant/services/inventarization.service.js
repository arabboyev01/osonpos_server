"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventarizationService = void 0;
const common_1 = require("@nestjs/common");
const tenant_service_1 = require("../tenant.service");
const log_service_1 = require("./log.service");
let InventarizationService = class InventarizationService {
    tenantService;
    logService;
    constructor(tenantService, logService) {
        this.tenantService = tenantService;
        this.logService = logService;
    }
    async createWarehouse(dbName, userId, dto) {
        const client = await this.tenantService.getClient(dbName);
        const warehouse = await client.s_Warehouse.create({ data: dto });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'CREATE_WAREHOUSE', warehouse);
        return warehouse;
    }
    async findAllWarehouses(dbName) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Warehouse.findMany({ where: { is_deleted: false } });
    }
    async findOneWarehouse(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        const warehouse = await client.s_Warehouse.findFirst({
            where: { id, is_deleted: false },
        });
        if (!warehouse)
            throw new common_1.NotFoundException('Warehouse not found');
        return warehouse;
    }
    async updateWarehouse(dbName, userId, id, dto) {
        const client = await this.tenantService.getClient(dbName);
        const warehouse = await client.s_Warehouse.update({
            where: { id },
            data: dto,
        });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'UPDATE_WAREHOUSE', warehouse);
        return warehouse;
    }
    async removeWarehouse(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Warehouse.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
    async createSupplier(dbName, userId, dto) {
        const client = await this.tenantService.getClient(dbName);
        const supplier = await client.s_Supplier.create({ data: dto });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'CREATE_SUPPLIER', supplier);
        return supplier;
    }
    async findAllSuppliers(dbName) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Supplier.findMany({ where: { is_deleted: false } });
    }
    async findOneSupplier(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        const supplier = await client.s_Supplier.findFirst({
            where: { id, is_deleted: false },
        });
        if (!supplier)
            throw new common_1.NotFoundException('Supplier not found');
        return supplier;
    }
    async updateSupplier(dbName, userId, id, dto) {
        const client = await this.tenantService.getClient(dbName);
        const supplier = await client.s_Supplier.update({
            where: { id },
            data: dto,
        });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'UPDATE_SUPPLIER', supplier);
        return supplier;
    }
    async removeSupplier(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Supplier.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
    async createStockList(dbName, userId, dto) {
        const client = await this.tenantService.getClient(dbName);
        const stock = await client.s_Stock_List.create({
            data: {
                ...dto,
                mon: dto.mon ?? '0',
                tue: dto.tue ?? '0',
                wed: dto.wed ?? '0',
                thu: dto.thu ?? '0',
                fri: dto.fri ?? '0',
                sat: dto.sat ?? '0',
                sun: dto.sun ?? '0',
            },
        });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'CREATE_STOCK_LIST', stock);
        return stock;
    }
    async findAllStockLists(dbName) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Stock_List.findMany({ where: { is_deleted: false } });
    }
    async findOneStockList(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        const stock = await client.s_Stock_List.findFirst({
            where: { id, is_deleted: false },
        });
        if (!stock)
            throw new common_1.NotFoundException('Stock item not found');
        return stock;
    }
    async updateStockList(dbName, userId, id, dto) {
        const client = await this.tenantService.getClient(dbName);
        const stock = await client.s_Stock_List.update({
            where: { id },
            data: dto,
        });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'UPDATE_STOCK_LIST', stock);
        return stock;
    }
    async removeStockList(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Stock_List.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
    async createInventory(dbName, userId, dto) {
        const client = await this.tenantService.getClient(dbName);
        const { items, ...data } = dto;
        const inventory = await client.d_Inventory.create({ data });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'CREATE_INVENTORY', inventory);
        if (items && items.length > 0) {
            await client.t_Inventory.createMany({
                data: items.map((item) => ({
                    ...item,
                    inventoryId: inventory.id,
                })),
            });
        }
        if (dto.conducted) {
            for (const item of items) {
                for (const wId of dto.warehouseId) {
                    await this.updateStockQuantity(dbName, item.itemId, wId, item.quantity, 'REPLACE', item.price, item.measureId, client);
                }
            }
        }
        return inventory;
    }
    async findAllInventories(dbName) {
        const client = await this.tenantService.getClient(dbName);
        return client.d_Inventory.findMany({ where: { is_deleted: false } });
    }
    async findOneInventory(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        const [header, items] = await Promise.all([
            client.d_Inventory.findFirst({ where: { id, is_deleted: false } }),
            client.t_Inventory.findMany({
                where: { inventoryId: id, is_deleted: false },
            }),
        ]);
        if (!header)
            throw new common_1.NotFoundException('Inventory not found');
        return { ...header, items };
    }
    async removeInventory(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        await client.t_Inventory.updateMany({
            where: { inventoryId: id },
            data: { is_deleted: true },
        });
        return client.d_Inventory.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
    async updateInventory(dbName, userId, id, dto) {
        const client = await this.tenantService.getClient(dbName);
        const current = await client.d_Inventory.findFirst({ where: { id } });
        if (!current)
            throw new common_1.NotFoundException('Inventory not found');
        const { items, ...data } = dto;
        if (items) {
            await client.t_Inventory.updateMany({
                where: { inventoryId: id },
                data: { is_deleted: true },
            });
            await client.t_Inventory.createMany({
                data: items.map((item) => ({ ...item, inventoryId: id })),
            });
        }
        const updated = await client.d_Inventory.update({
            where: { id },
            data,
        });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'UPDATE_INVENTORY', updated);
        if (!current.conducted && updated.conducted) {
            const itemsToUse = items ||
                (await client.t_Inventory.findMany({
                    where: { inventoryId: id, is_deleted: false },
                }));
            for (const item of itemsToUse) {
                for (const wId of updated.warehouseId) {
                    await this.updateStockQuantity(dbName, item.itemId, wId, item.quantity, 'REPLACE', item.price, item.measureId, client);
                }
            }
        }
        return updated;
    }
    async createReceipt(dbName, userId, dto) {
        const client = await this.tenantService.getClient(dbName);
        const { items, ...data } = dto;
        const receipt = await client.d_Receipt.create({ data });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'CREATE_RECEIPT', receipt);
        if (items && items.length > 0) {
            await client.t_Receipt.createMany({
                data: items.map((item) => ({
                    ...item,
                    receiptId: receipt.id,
                })),
            });
        }
        if (dto.conducted) {
            for (const item of items) {
                for (const wId of dto.warehouseId) {
                    await this.updateStockQuantity(dbName, item.itemId, wId, item.quantity, 'ADD', item.price, item.measureId, client);
                }
            }
        }
        return receipt;
    }
    async findAllReceipts(dbName) {
        const client = await this.tenantService.getClient(dbName);
        return client.d_Receipt.findMany({ where: { is_deleted: false } });
    }
    async findOneReceipt(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        const [header, items] = await Promise.all([
            client.d_Receipt.findFirst({ where: { id, is_deleted: false } }),
            client.t_Receipt.findMany({
                where: { receiptId: id, is_deleted: false },
            }),
        ]);
        if (!header)
            throw new common_1.NotFoundException('Receipt not found');
        return { ...header, items };
    }
    async removeReceipt(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        await client.t_Receipt.updateMany({
            where: { receiptId: id },
            data: { is_deleted: true },
        });
        return client.d_Receipt.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
    async updateReceipt(dbName, userId, id, dto) {
        const client = await this.tenantService.getClient(dbName);
        const current = await client.d_Receipt.findFirst({ where: { id } });
        if (!current)
            throw new common_1.NotFoundException('Receipt not found');
        const { items, ...data } = dto;
        if (items) {
            await client.t_Receipt.updateMany({
                where: { receiptId: id },
                data: { is_deleted: true },
            });
            await client.t_Receipt.createMany({
                data: items.map((item) => ({ ...item, receiptId: id })),
            });
        }
        const updated = await client.d_Receipt.update({
            where: { id },
            data,
        });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'UPDATE_RECEIPT', updated);
        if (!current.conducted && updated.conducted) {
            const itemsToUse = items ||
                (await client.t_Receipt.findMany({
                    where: { receiptId: id, is_deleted: false },
                }));
            for (const item of itemsToUse) {
                for (const wId of updated.warehouseId) {
                    await this.updateStockQuantity(dbName, item.itemId, wId, item.quantity, 'ADD', item.price, item.measureId, client);
                }
            }
        }
        return updated;
    }
    async createCancellation(dbName, userId, dto) {
        const client = await this.tenantService.getClient(dbName);
        const { items, ...data } = dto;
        const cancellation = await client.d_Cancellation.create({ data });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'CREATE_CANCELLATION', cancellation);
        if (items && items.length > 0) {
            await client.t_Cancellation.createMany({
                data: items.map((item) => ({
                    ...item,
                    cancellationId: cancellation.id,
                })),
            });
        }
        if (dto.conducted) {
            for (const item of items) {
                for (const wId of dto.warehouseId) {
                    await this.updateStockQuantity(dbName, item.itemId, wId, item.quantity, 'SUBTRACT', item.price, item.measureId, client);
                }
            }
        }
        return cancellation;
    }
    async findAllCancellations(dbName) {
        const client = await this.tenantService.getClient(dbName);
        return client.d_Cancellation.findMany({ where: { is_deleted: false } });
    }
    async findOneCancellation(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        const [header, items] = await Promise.all([
            client.d_Cancellation.findFirst({ where: { id, is_deleted: false } }),
            client.t_Cancellation.findMany({
                where: { cancellationId: id, is_deleted: false },
            }),
        ]);
        if (!header)
            throw new common_1.NotFoundException('Cancellation not found');
        return { ...header, items };
    }
    async removeCancellation(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        await client.t_Cancellation.updateMany({
            where: { cancellationId: id },
            data: { is_deleted: true },
        });
        return client.d_Cancellation.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
    async updateCancellation(dbName, userId, id, dto) {
        const client = await this.tenantService.getClient(dbName);
        const current = await client.d_Cancellation.findFirst({ where: { id } });
        if (!current)
            throw new common_1.NotFoundException('Cancellation not found');
        const { items, ...data } = dto;
        if (items) {
            await client.t_Cancellation.updateMany({
                where: { cancellationId: id },
                data: { is_deleted: true },
            });
            await client.t_Cancellation.createMany({
                data: items.map((item) => ({ ...item, cancellationId: id })),
            });
        }
        const updated = await client.d_Cancellation.update({
            where: { id },
            data,
        });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'UPDATE_CANCELLATION', updated);
        if (!current.conducted && updated.conducted) {
            const itemsToUse = items ||
                (await client.t_Cancellation.findMany({
                    where: { cancellationId: id, is_deleted: false },
                }));
            for (const item of itemsToUse) {
                for (const wId of updated.warehouseId) {
                    await this.updateStockQuantity(dbName, item.itemId, wId, item.quantity, 'SUBTRACT', item.price, item.measureId, client);
                }
            }
        }
        return updated;
    }
    async createMovement(dbName, userId, dto) {
        const client = await this.tenantService.getClient(dbName);
        const { items, ...data } = dto;
        const movement = await client.d_Movement.create({ data });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'CREATE_MOVEMENT', movement);
        if (items && items.length > 0) {
            await client.t_Movement.createMany({
                data: items.map((item) => ({
                    ...item,
                    movementId: movement.id,
                })),
            });
        }
        for (const item of items) {
            await this.updateStockQuantity(dbName, item.itemId, dto.warehouseId, item.quantity, 'SUBTRACT', item.price, item.measureId, client);
            await this.updateStockQuantity(dbName, item.itemId, dto.toWarehouseId, item.quantity, 'ADD', item.price, item.measureId, client);
        }
        return movement;
    }
    async findAllMovements(dbName) {
        const client = await this.tenantService.getClient(dbName);
        return client.d_Movement.findMany({ where: { is_deleted: false } });
    }
    async findOneMovement(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        const [header, items] = await Promise.all([
            client.d_Movement.findFirst({ where: { id, is_deleted: false } }),
            client.t_Movement.findMany({
                where: { movementId: id, is_deleted: false },
            }),
        ]);
        if (!header)
            throw new common_1.NotFoundException('Movement not found');
        return { ...header, items };
    }
    async removeMovement(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        await client.t_Movement.updateMany({
            where: { movementId: id },
            data: { is_deleted: true },
        });
        return client.d_Movement.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
    async updateMovement(dbName, userId, id, dto) {
        const client = await this.tenantService.getClient(dbName);
        const { items, ...data } = dto;
        if (items) {
            await client.t_Movement.updateMany({
                where: { movementId: id },
                data: { is_deleted: true },
            });
            await client.t_Movement.createMany({
                data: items.map((item) => ({ ...item, movementId: id })),
            });
        }
        const updated = await client.d_Movement.update({
            where: { id },
            data,
        });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'UPDATE_MOVEMENT', updated);
        return updated;
    }
    async updateStockQuantity(dbName, itemId, warehouseId, quantityStr, mode, price, measureId, tx) {
        const client = tx || (await this.tenantService.getClient(dbName));
        const quantity = parseFloat(quantityStr);
        const stock = await client.s_Stock_List.findFirst({
            where: { itemId, warehouseId, is_deleted: false },
        });
        if (stock) {
            let newQuantity = parseFloat(stock.stock_quantity);
            if (mode === 'ADD')
                newQuantity += quantity;
            else if (mode === 'SUBTRACT')
                newQuantity -= quantity;
            else if (mode === 'REPLACE')
                newQuantity = quantity;
            return client.s_Stock_List.update({
                where: { id: stock.id },
                data: {
                    stock_quantity: newQuantity.toString(),
                    price,
                    measureId,
                    dt_updated: new Date(),
                },
            });
        }
        else {
            let finalQuantity = quantity;
            if (mode === 'SUBTRACT')
                finalQuantity = -quantity;
            return client.s_Stock_List.create({
                data: {
                    itemId,
                    warehouseId,
                    stock_quantity: finalQuantity.toString(),
                    price,
                    measureId,
                    dateFrom: new Date(),
                    mon: '0',
                    tue: '0',
                    wed: '0',
                    thu: '0',
                    fri: '0',
                    sat: '0',
                    sun: '0',
                },
            });
        }
    }
};
exports.InventarizationService = InventarizationService;
exports.InventarizationService = InventarizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_service_1.TenantService,
        log_service_1.LogService])
], InventarizationService);
//# sourceMappingURL=inventarization.service.js.map