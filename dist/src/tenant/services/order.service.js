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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const tenant_service_1 = require("../tenant.service");
const log_service_1 = require("./log.service");
const inventarization_service_1 = require("./inventarization.service");
let OrderService = class OrderService {
    tenantService;
    logService;
    inventarizationService;
    constructor(tenantService, logService, inventarizationService) {
        this.tenantService = tenantService;
        this.logService = logService;
        this.inventarizationService = inventarizationService;
    }
    async create(dbName, dto, userId) {
        const client = await this.tenantService.getClient(dbName);
        const { items, discounts, taxes, delivery, ...orderData } = dto;
        orderData.employee_id = userId;
        return client.$transaction(async (tx) => {
            const order = await tx.d_Order.create({
                data: orderData,
            });
            if (items && items.length > 0) {
                await tx.t_Order_Item.createMany({
                    data: items.map((item) => ({
                        ...item,
                        order_id: order.id,
                        employee_id: order.employee_id,
                    })),
                });
            }
            if (discounts && discounts.length > 0) {
                await tx.t_Order_Discount.createMany({
                    data: discounts.map((d) => ({
                        ...d,
                        order_id: order.id,
                        item_id: d.item_id || null,
                    })),
                });
            }
            if (taxes && taxes.length > 0) {
                await tx.t_Order_Item_Tax.createMany({
                    data: taxes.map((t) => ({
                        ...t,
                        order_id: order.id,
                        item_id: t.item_id || null,
                    })),
                });
            }
            if (delivery) {
                await tx.t_Order_Delivery.create({
                    data: {
                        ...delivery,
                        order_id: order.id,
                        estimated_arrival: delivery.estimated_arrival
                            ? new Date(delivery.estimated_arrival)
                            : undefined,
                    },
                });
            }
            await this.logService.recordLog(dbName, userId, 'ORDER', 'CREATE_ORDER', order);
            const itemIds = items.map((i) => i.item_id);
            const sItems = await tx.s_Item.findMany({
                where: { id: { in: itemIds } },
            });
            const itemMap = new Map(sItems.map((i) => [i.id, i]));
            const warehouses = await tx.s_Warehouse.findMany({
                where: { is_deleted: false },
                take: 1,
            });
            if (warehouses.length > 0) {
                const warehouseId = warehouses[0].id;
                for (const item of items) {
                    const sItem = itemMap.get(item.item_id);
                    if (sItem) {
                        await this.inventarizationService.updateStockQuantity(dbName, item.item_id, warehouseId, item.quantity, 'SUBTRACT', item.price, sItem.measurement, tx);
                    }
                }
            }
            return order;
        });
    }
    async update(dbName, id, dto, userId) {
        const client = await this.tenantService.getClient(dbName);
        const { items, discounts, taxes, delivery, payments, ...orderData } = dto;
        orderData.employee_id = userId;
        return client.$transaction(async (tx) => {
            if (dto.is_closed === true) {
                orderData.dt_closed = new Date();
            }
            const order = await tx.d_Order.update({
                where: { id },
                data: orderData,
            });
            if (items !== undefined) {
                await tx.t_Order_Item.deleteMany({ where: { order_id: id } });
                if (items.length > 0) {
                    await tx.t_Order_Item.createMany({
                        data: items.map((item) => ({
                            ...item,
                            order_id: id,
                            employee_id: userId,
                        })),
                    });
                }
            }
            if (discounts && discounts.length > 0) {
                await tx.t_Order_Discount.createMany({
                    data: discounts.map((d) => ({
                        ...d,
                        order_id: order.id,
                        item_id: d.item_id || null,
                    })),
                });
            }
            if (taxes !== undefined) {
                await tx.t_Order_Item_Tax.deleteMany({ where: { order_id: id } });
                if (taxes.length > 0) {
                    await tx.t_Order_Item_Tax.createMany({
                        data: taxes.map((t) => ({
                            ...t,
                            order_id: id,
                        })),
                    });
                }
            }
            if (delivery !== undefined) {
                if (delivery === null) {
                    await tx.t_Order_Delivery.deleteMany({ where: { order_id: id } });
                }
                else {
                    const existingDelivery = await tx.t_Order_Delivery.findUnique({
                        where: { order_id: id },
                    });
                    if (existingDelivery) {
                        await tx.t_Order_Delivery.update({
                            where: { order_id: id },
                            data: {
                                ...delivery,
                                estimated_arrival: delivery.estimated_arrival
                                    ? new Date(delivery.estimated_arrival)
                                    : undefined,
                            },
                        });
                    }
                    else {
                        await tx.t_Order_Delivery.create({
                            data: {
                                ...delivery,
                                order_id: id,
                                estimated_arrival: delivery.estimated_arrival
                                    ? new Date(delivery.estimated_arrival)
                                    : undefined,
                            },
                        });
                    }
                }
            }
            if (payments !== undefined) {
                await tx.t_Order_Payment.deleteMany({ where: { order_id: id } });
                if (payments.length > 0) {
                    await tx.t_Order_Payment.createMany({
                        data: payments.map((p) => ({
                            ...p,
                            order_id: id,
                            employee_id: userId,
                            workplace_id: order.workplace_id,
                        })),
                    });
                }
            }
            await this.logService.recordLog(dbName, userId, 'ORDER', 'UPDATE_ORDER', order);
            return order;
        });
    }
    async remove(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.d_Order.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_service_1.TenantService,
        log_service_1.LogService,
        inventarization_service_1.InventarizationService])
], OrderService);
//# sourceMappingURL=order.service.js.map