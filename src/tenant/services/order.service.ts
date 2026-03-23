import { Injectable } from '@nestjs/common';
import { TenantService } from '../tenant.service';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';
import { LogService } from './log.service';
import { S_Logs_Type } from '@prisma/client';
import { InventarizationService } from './inventarization.service';

@Injectable()
export class OrderService {
  constructor(
    private tenantService: TenantService,
    private logService: LogService,
    private inventarizationService: InventarizationService,
  ) {}

  async create(dbName: string, dto: CreateOrderDto, employeeId: string) {
    const client = await this.tenantService.getClient(dbName);
    const { items, discounts, taxes, delivery, ...orderData } = dto;

    // Use the authenticated employee's ID
    orderData.employee_id = employeeId;

    return client.$transaction(async (tx) => {
      // 1. Create Order
      const order = await tx.d_Order.create({
        data: orderData as any,
      });

      // 2. Create Items
      if (items && items.length > 0) {
        await tx.t_Order_Item.createMany({
          data: items.map((item) => ({
            ...item,
            order_id: order.id,
            employee_id: order.employee_id,
          })),
        });
      }

      // 3. Create Discounts
      if (discounts && discounts.length > 0) {
        await tx.t_Order_Discount.createMany({
          data: discounts.map((d) => ({
            ...d,
            order_id: order.id,
          })),
        });
      }

      // 4. Create Taxes
      if (taxes && taxes.length > 0) {
        await tx.t_Order_Item_Tax.createMany({
          data: taxes.map((t) => ({
            ...t,
            order_id: order.id,
          })),
        });
      }

      // 4. Create Delivery
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

      // Log order creation omitted for brevity in diff...
      this.logService
        .create(dbName, {
          user_id: order.employee_id,
          type: S_Logs_Type.ORDER,
          action: 'Order created',
          details: `Order ID: ${order.id}, Amount: ${order.total_sum}`,
        })
        .catch((err) =>
          console.error(
            `Failed to log order creation in ${dbName}: ${err.message}`,
          ),
        );

      // Update Stock (outside transaction for now given existing updateStockQuantity implementation)
      // We look up the items to get their measurement units
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
    employeeId: string,
  ) {
    const client = await this.tenantService.getClient(dbName);
    const { items, discounts, taxes, delivery, ...orderData } = dto;

    // Use the authenticated employee's ID for audit trail if needed,
    // though the order record probably stores only the initial employee_id.
    // If the requirement is to TRACK who updated it, we might need a separate field.
    // However, the user said "you provide employee id inside the server", so I'll follow that.
    (orderData as any).employee_id = employeeId;

    return client.$transaction(async (tx) => {
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
              employee_id: employeeId, // Use the one who UPDATED it for the items as well
            })),
          });
        }
      }

      // 3. Update Discounts
      if (discounts !== undefined) {
        await tx.t_Order_Discount.deleteMany({ where: { order_id: id } });
        if (discounts.length > 0) {
          await tx.t_Order_Discount.createMany({
            data: discounts.map((d) => ({
              ...d,
              order_id: id,
            })),
          });
        }
      }

      // 4. Update Taxes
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

      // 5. Update Delivery
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

      // Log order update
      this.logService
        .create(dbName, {
          user_id: order.employee_id,
          type: S_Logs_Type.ORDER,
          action: 'Order updated',
          details: `Order ID: ${order.id}, Amount: ${order.total_sum}`,
        })
        .catch((err) =>
          console.error(
            `Failed to log order update in ${dbName}: ${err.message}`,
          ),
        );

      return order;
    });
  }

  async findAll(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.d_Order.findMany({
      where: { is_deleted: false },
      orderBy: { dt_created: 'desc' },
    });
  }

  async findOne(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.d_Order.findFirst({
      where: {
        id,
        is_deleted: false,
      },
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
