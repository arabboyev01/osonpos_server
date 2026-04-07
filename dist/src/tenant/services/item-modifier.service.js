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
exports.ItemModifierService = void 0;
const common_1 = require("@nestjs/common");
const tenant_service_1 = require("../tenant.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const log_service_1 = require("./log.service");
let ItemModifierService = class ItemModifierService {
    tenantService;
    logService;
    prisma;
    constructor(tenantService, logService, prisma) {
        this.tenantService = tenantService;
        this.logService = logService;
        this.prisma = prisma;
    }
    async createItem(dbName, userId, dto) {
        const client = await this.tenantService.getClient(dbName);
        const { stock_quantity, warehouseId, ...itemData } = dto;
        const item = await client.s_Item.create({ data: itemData });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'CREATE_ITEM', item);
        if (stock_quantity && stock_quantity !== '0') {
            let wId = warehouseId;
            if (!wId) {
                const warehouse = await client.s_Warehouse.findFirst({
                    where: { is_deleted: false },
                });
                if (warehouse)
                    wId = warehouse.id;
            }
            if (wId) {
                await client.s_Stock_List.create({
                    data: {
                        itemId: item.id,
                        warehouseId: wId,
                        stock_quantity: stock_quantity,
                        price: item.price || '0',
                        measureId: item.measurement || 'dona',
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
            else {
                console.warn(`[Item] No warehouse found to save stock for item ${item.id}`);
            }
        }
        return { ...item, stock_quantity: stock_quantity || '0' };
    }
    async findAllItems(dbName, workplaceId) {
        const client = await this.tenantService.getClient(dbName);
        const idAutomatedPoint = await this.tenantService.getAutomatedPointId(client, workplaceId);
        let sql = `
      SELECT 
        i.*, 
        COALESCE(SUM(CAST(NULLIF(s.stock_quantity, '') AS NUMERIC)), 0)::TEXT as stock_quantity
      FROM "S_Item" i
      LEFT JOIN "S_Stock_List" s ON i.id = s."itemId" AND s.is_deleted = false
      WHERE i.is_deleted = false
    `;
        const queryArgs = [];
        if (idAutomatedPoint) {
            sql += ` AND i."id_automated_point" = $1`;
            queryArgs.push(idAutomatedPoint);
        }
        sql += ` GROUP BY i.id`;
        const items = await client.$queryRawUnsafe(sql, ...queryArgs);
        return items;
    }
    async findOneItem(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        const sql = `
      SELECT 
        i.*, 
        COALESCE(SUM(CAST(NULLIF(s.stock_quantity, '') AS NUMERIC)), 0)::TEXT as stock_quantity
      FROM "S_Item" i
      LEFT JOIN "S_Stock_List" s ON i.id = s."itemId" AND s.is_deleted = false
      WHERE i.id = $1 AND i.is_deleted = false
      GROUP BY i.id
    `;
        const result = await client.$queryRawUnsafe(sql, id);
        return result.length > 0 ? result[0] : null;
    }
    async updateItem(dbName, userId, id, dto) {
        const client = await this.tenantService.getClient(dbName);
        const { stock_quantity, warehouseId, ...itemData } = dto;
        const item = await client.s_Item.update({ where: { id }, data: itemData });
        if (stock_quantity) {
            let wId = warehouseId;
            if (!wId) {
                const existingStock = await client.s_Stock_List.findFirst({
                    where: { itemId: id, is_deleted: false },
                });
                if (existingStock) {
                    wId = existingStock.warehouseId;
                }
                else {
                    const warehouse = await client.s_Warehouse.findFirst({
                        where: { is_deleted: false },
                    });
                    if (warehouse)
                        wId = warehouse.id;
                }
            }
            if (wId) {
                const stock = await client.s_Stock_List.findFirst({
                    where: { itemId: id, warehouseId: wId, is_deleted: false },
                });
                if (stock) {
                    await client.s_Stock_List.update({
                        where: { id: stock.id },
                        data: { stock_quantity, price: item.price, dt_updated: new Date() },
                    });
                }
                else {
                    await client.s_Stock_List.create({
                        data: {
                            itemId: id,
                            warehouseId: wId,
                            stock_quantity,
                            price: item.price,
                            measureId: item.measurement,
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
        }
        const updatedStocks = await client.s_Stock_List.findMany({
            where: { itemId: id, is_deleted: false },
        });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'UPDATE_ITEM', item);
        const totalStock = updatedStocks.reduce((sum, s) => sum + parseFloat(s.stock_quantity), 0);
        return {
            ...item,
            stock_quantity: totalStock.toString(),
        };
    }
    async removeItem(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Item.update({ where: { id }, data: { is_deleted: true } });
    }
    async createItemGroup(dbName, userId, dto) {
        const client = await this.tenantService.getClient(dbName);
        const itemGroup = await client.s_Item_Group.create({ data: dto });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'CREATE_ITEM_GROUP', itemGroup);
        return itemGroup;
    }
    async findAllItemGroups(dbName, workplaceId) {
        const client = await this.tenantService.getClient(dbName);
        const idAutomatedPoint = await this.tenantService.getAutomatedPointId(client, workplaceId);
        const where = { is_deleted: false };
        if (idAutomatedPoint) {
            where.OR = [
                { id_automated_point: idAutomatedPoint },
                { id_automated_point: '0' },
                { id_automated_point: null },
            ];
        }
        return client.s_Item_Group.findMany({ where });
    }
    async findOneItemGroup(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Item_Group.findFirst({ where: { id, is_deleted: false } });
    }
    async updateItemGroup(dbName, userId, id, dto) {
        const client = await this.tenantService.getClient(dbName);
        const itemGroup = await client.s_Item_Group.update({
            where: { id },
            data: dto,
        });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'UPDATE_ITEM_GROUP', itemGroup);
        return itemGroup;
    }
    async removeItemGroup(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Item_Group.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
    async createModifier(dbName, userId, dto) {
        const client = await this.tenantService.getClient(dbName);
        const { stock_quantity, warehouseId, ...modifierData } = dto;
        const modifier = await client.s_Modifier.create({ data: modifierData });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'CREATE_MODIFIER', modifier);
        if (stock_quantity && stock_quantity !== '0') {
            let wId = warehouseId;
            if (!wId) {
                const warehouse = await client.s_Warehouse.findFirst({
                    where: { is_deleted: false },
                });
                if (warehouse)
                    wId = warehouse.id;
            }
            if (wId) {
                await client.s_Stock_List.create({
                    data: {
                        itemId: modifier.id,
                        warehouseId: wId,
                        stock_quantity: stock_quantity,
                        price: modifier.price || '0',
                        measureId: modifier.measurement || 'dona',
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
            else {
                console.warn(`[Modifier] No warehouse found to save stock for modifier ${modifier.id}`);
            }
        }
        return modifier;
    }
    async findAllModifiers(dbName, workplaceId) {
        const client = await this.tenantService.getClient(dbName);
        const idAutomatedPoint = await this.tenantService.getAutomatedPointId(client, workplaceId);
        const where = { is_deleted: false };
        if (idAutomatedPoint) {
            where.OR = [
                { id_automated_point: idAutomatedPoint },
                { id_automated_point: '0' },
            ];
        }
        return client.s_Modifier.findMany({ where });
    }
    async findOneModifier(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Modifier.findFirst({ where: { id, is_deleted: false } });
    }
    async updateModifier(dbName, userId, id, dto) {
        const client = await this.tenantService.getClient(dbName);
        const { stock_quantity, warehouseId, ...modifierData } = dto;
        const modifier = await client.s_Modifier.update({
            where: { id },
            data: modifierData,
        });
        if (stock_quantity) {
            let wId = warehouseId;
            if (!wId) {
                const existingStock = await client.s_Stock_List.findFirst({
                    where: { itemId: id, is_deleted: false },
                });
                if (existingStock) {
                    wId = existingStock.warehouseId;
                }
                else {
                    const warehouse = await client.s_Warehouse.findFirst({
                        where: { is_deleted: false },
                    });
                    if (warehouse)
                        wId = warehouse.id;
                }
            }
            if (wId) {
                const stock = await client.s_Stock_List.findFirst({
                    where: { itemId: id, warehouseId: wId, is_deleted: false },
                });
                if (stock) {
                    await client.s_Stock_List.update({
                        where: { id: stock.id },
                        data: {
                            stock_quantity,
                            price: modifier.price,
                            dt_updated: new Date(),
                        },
                    });
                }
                else {
                    await client.s_Stock_List.create({
                        data: {
                            itemId: id,
                            warehouseId: wId,
                            stock_quantity,
                            price: modifier.price,
                            measureId: modifier.measurement,
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
        }
        return modifier;
    }
    async removeModifier(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Modifier.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
    async createModifierGroup(dbName, userId, dto) {
        const client = await this.tenantService.getClient(dbName);
        const modifierGroup = await client.s_ModifierGroup.create({ data: dto });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'CREATE_MODIFIER_GROUP', modifierGroup);
        return modifierGroup;
    }
    async findAllModifierGroups(dbName, workplaceId) {
        const client = await this.tenantService.getClient(dbName);
        const idAutomatedPoint = await this.tenantService.getAutomatedPointId(client, workplaceId);
        const where = { is_deleted: false };
        if (idAutomatedPoint) {
            where.OR = [
                { id_automated_point: idAutomatedPoint },
                { id_automated_point: '0' },
                { id_automated_point: null },
            ];
        }
        return client.s_ModifierGroup.findMany({ where });
    }
    async findOneModifierGroup(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_ModifierGroup.findFirst({
            where: { id, is_deleted: false },
        });
    }
    async updateModifierGroup(dbName, userId, id, dto) {
        const client = await this.tenantService.getClient(dbName);
        const modifierGroup = await client.s_ModifierGroup.update({
            where: { id },
            data: dto,
        });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'UPDATE_MODIFIER_GROUP', modifierGroup);
        return modifierGroup;
    }
    async removeModifierGroup(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_ModifierGroup.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
};
exports.ItemModifierService = ItemModifierService;
exports.ItemModifierService = ItemModifierService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_service_1.TenantService,
        log_service_1.LogService,
        prisma_service_1.PrismaService])
], ItemModifierService);
//# sourceMappingURL=item-modifier.service.js.map