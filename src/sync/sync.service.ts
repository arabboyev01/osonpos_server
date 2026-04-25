import { Injectable } from '@nestjs/common';
import { TenantService } from '../tenant/tenant.service';

@Injectable()
export class SyncService {
  constructor(private readonly tenantService: TenantService) {}

  private readonly syncableTables = [
    's_Item',
    's_Item_Group',
    's_Subcategory',
    's_Modifier',
    's_ModifierGroup',
    's_Measurement',
    's_Payment_Type',
    's_Tax_Fee',
    's_Discount',
    's_Printer',
    's_Payment_Devices',
    's_Payment_Method',
    'd_Order',
    't_Order_Item',
    't_Order_Discount',
    't_Order_Item_Tax',
    't_Order_Delivery',
    't_Order_Payment',
    's_Warehouse',
    's_Supplier',
    's_Clients',
  ];

  async pullChanges(dbName: string, lastSyncTime: string) {
    const client = await this.tenantService.getClient(dbName);
    const updates: Record<string, any[]> = {};
    const lastSyncDate = lastSyncTime ? new Date(lastSyncTime) : new Date(0);

    for (const table of this.syncableTables) {
      // @ts-ignore
      updates[table] = await client[table].findMany({
        where: {
          dt_updated: {
            gt: lastSyncDate,
          },
        },
      });
    }

    return {
      serverTime: new Date().toISOString(),
      updates,
    };
  }

  async pushChanges(dbName: string, updates: Record<string, any[]>) {
    const client = await this.tenantService.getClient(dbName);

    // Use a transaction to ensure atomicity
    await client.$transaction(async (tx) => {
      for (const [table, records] of Object.entries(updates)) {
        if (!this.syncableTables.includes(table)) continue;

        for (const record of records) {
          const { id, ...data } = record;
          // Use upsert to handle both new and existing records
          // @ts-ignore
          await tx[table].upsert({
            where: { id },
            update: {
              ...data,
              dt_updated: new Date(), // Update the server timestamp
            },
            create: {
              id,
              ...data,
              dt_updated: new Date(),
            },
          });
        }
      }
    });

    return { success: true };
  }
}
