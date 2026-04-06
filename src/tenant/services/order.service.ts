import { Injectable } from '@nestjs/common';
import { TenantService } from '../tenant.service';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';
import { LogService } from './log.service';
import { InventarizationService } from './inventarization.service';

@Injectable()
export class OrderService {
  constructor(
    private tenantService: TenantService,
    private logService: LogService,
    private inventarizationService: InventarizationService,
  ) { }

  async create(dbName: string, dto: CreateOrderDto, userId: string) {
    const client = await this.tenantService.getClient(dbName);
    const { items, discounts, taxes, delivery, ...orderData } = dto;

    orderData.employee_id = userId;

    return client.$transaction(async (tx) => {
      const order = await tx.d_Order.create({
        data: orderData as any,
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

      await this.logService.recordLog(
        dbName,
        userId,
        'ORDER',
        'CREATE_ORDER',
        order,
      );

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
            await this.inventarizationService.updateStockQuantity(
              dbName,
              item.item_id,
              warehouseId,
              item.quantity,
              'SUBTRACT',
              item.price,
              sItem.measurement,
              tx,
            );
          }
        }
      }

      return order;
    });
  }

  async update(
    dbName: string,
    id: string,
    dto: UpdateOrderDto,
    userId: string,
  ) {
    const client = await this.tenantService.getClient(dbName);
    const { items, discounts, taxes, delivery, payments, ...orderData } = dto;

    (orderData as any).employee_id = userId;

    return client.$transaction(async (tx) => {
      // If order is being closed, set dt_closed
      if (dto.is_closed === true) {
        (orderData as any).dt_closed = new Date();
      }

      // 1. Update Order
      const order = await tx.d_Order.update({
        where: { id },
        data: orderData as any,
      });

      // 2. Update Items (Delete and create new ones if provided)
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
        } else {
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
          } else {
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

      // Log order update
      await this.logService.recordLog(
        dbName,
        userId,
        'ORDER',
        'UPDATE_ORDER',
        order,
      );

      return order;
    });
  }

  async remove(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.d_Order.update({
      where: { id },
      data: { is_deleted: true },
    });
  }
}
