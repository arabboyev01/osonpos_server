import { Injectable } from '@nestjs/common';
import { TenantService } from '../tenant.service';
import { CreateOrderDto } from '../dto/order.dto';
import { LogService } from './log.service';
import { S_Logs_Type } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(
    private tenantService: TenantService,
    private logService: LogService,
  ) { }

  async create(dbName: string, dto: CreateOrderDto) {
    const client = await this.tenantService.getClient(dbName);
    const { items, discounts, taxes, delivery, ...orderData } = dto;

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
      
      // Log order creation
      this.logService.create(dbName, {
        user_id: order.employee_id,
        type: S_Logs_Type.ORDER,
        action: 'Order created',
        details: `Order ID: ${order.id}, Amount: ${order.total_sum}`
      }).catch(err => console.error(`Failed to log order creation in ${dbName}: ${err.message}`));

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
