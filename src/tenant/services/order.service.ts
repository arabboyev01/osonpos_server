import { Injectable } from '@nestjs/common';
import { TenantService } from '../tenant.service';
import { CreateOrderDto } from '../dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private tenantService: TenantService) {}

  async create(dbName: string, dto: CreateOrderDto) {
    const client = await this.tenantService.getClient(dbName);
    const { items, discounts, delivery, ...orderData } = dto;

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
