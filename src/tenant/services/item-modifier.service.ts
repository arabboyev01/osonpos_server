import { Injectable } from '@nestjs/common';
import { TenantService } from '../tenant.service';
import {
  CreateItemDto,
  UpdateItemDto,
  CreateItemGroupDto,
  UpdateItemGroupDto,
  CreateModifierDto,
  UpdateModifierDto,
  CreateModifierGroupDto,
  UpdateModifierGroupDto,
} from '../dto/item-modifier.dto';

import { LogService } from './log.service';

@Injectable()
export class ItemModifierService {
  constructor(
    private tenantService: TenantService,
    private logService: LogService,
  ) {}

  // Items
  async createItem(dbName: string, userId: string, dto: CreateItemDto) {
    const client = await this.tenantService.getClient(dbName);
    const { stock_quantity, warehouseId, ...itemData } = dto;
    const item = await client.s_Item.create({ data: itemData });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'CREATE_ITEM',
      item,
    );

    if (stock_quantity && stock_quantity !== '0') {
      let wId = warehouseId;
      if (!wId) {
        const warehouse = await client.s_Warehouse.findFirst({
          where: { is_deleted: false },
        });
        if (warehouse) wId = warehouse.id;
      }

      if (wId) {
        console.log(
          `[Item] Creating stock list for item ${item.id} in warehouse ${wId} with qty ${stock_quantity}`,
        );
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
      } else {
        console.warn(
          `[Item] No warehouse found to save stock for item ${item.id}`,
        );
      }
    }

    return { ...item, stock_quantity: stock_quantity || '0' };
  }

  async findAllItems(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    const [items, stocks] = await Promise.all([
      client.s_Item.findMany({ where: { is_deleted: false } }),
      client.s_Stock_List.findMany({ where: { is_deleted: false } }),
    ]);

    const stockMap = stocks.reduce(
      (acc, s) => {
        acc[s.itemId] = (acc[s.itemId] || 0) + parseFloat(s.stock_quantity);
        return acc;
      },
      {} as Record<string, number>,
    );

    return items.map((item) => ({
      ...item,
      stock_quantity: (stockMap[item.id] || 0).toString(),
    }));
  }

  async findOneItem(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    const [item, stocks] = await Promise.all([
      client.s_Item.findFirst({ where: { id, is_deleted: false } }),
      client.s_Stock_List.findMany({
        where: { itemId: id, is_deleted: false },
      }),
    ]);

    if (!item) return null;

    const totalStock = stocks.reduce(
      (sum, s) => sum + parseFloat(s.stock_quantity),
      0,
    );

    return {
      ...item,
      stock_quantity: totalStock.toString(),
    };
  }

  async updateItem(
    dbName: string,
    userId: string,
    id: string,
    dto: UpdateItemDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    const { stock_quantity, warehouseId, ...itemData } = dto;
    const [item, stocks] = await Promise.all([
      client.s_Item.update({ where: { id }, data: itemData }),
      client.s_Stock_List.findMany({
        where: { itemId: id, is_deleted: false },
      }),
    ]);

    if (stock_quantity) {
      let wId = warehouseId;
      if (!wId) {
        // Try to find if this item already has stock in SOME warehouse
        const existingStock = await client.s_Stock_List.findFirst({
          where: { itemId: id, is_deleted: false },
        });
        if (existingStock) {
          wId = existingStock.warehouseId;
        } else {
          // Fallback to first available warehouse
          const warehouse = await client.s_Warehouse.findFirst({
            where: { is_deleted: false },
          });
          if (warehouse) wId = warehouse.id;
        }
      }

      if (wId) {
        console.log(
          `[Item Update] Updating stock for item ${id} in warehouse ${wId} to ${stock_quantity}`,
        );
        const stock = await client.s_Stock_List.findFirst({
          where: { itemId: id, warehouseId: wId, is_deleted: false },
        });

        if (stock) {
          await client.s_Stock_List.update({
            where: { id: stock.id },
            data: { stock_quantity, price: item.price, dt_updated: new Date() },
          });
        } else {
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

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'UPDATE_ITEM',
      item,
    );

    const totalStock = updatedStocks.reduce(
      (sum, s) => sum + parseFloat(s.stock_quantity),
      0,
    );

    return {
      ...item,
      stock_quantity: totalStock.toString(),
    };
  }

  async removeItem(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Item.update({ where: { id }, data: { is_deleted: true } });
  }

  // Item Groups
  async createItemGroup(
    dbName: string,
    userId: string,
    dto: CreateItemGroupDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    const itemGroup = await client.s_Item_Group.create({ data: dto });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'CREATE_ITEM_GROUP',
      itemGroup,
    );

    return itemGroup;
  }

  async findAllItemGroups(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Item_Group.findMany({ where: { is_deleted: false } });
  }

  async findOneItemGroup(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Item_Group.findFirst({ where: { id, is_deleted: false } });
  }

  async updateItemGroup(
    dbName: string,
    userId: string,
    id: string,
    dto: UpdateItemGroupDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    const itemGroup = await client.s_Item_Group.update({
      where: { id },
      data: dto,
    });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'UPDATE_ITEM_GROUP',
      itemGroup,
    );

    return itemGroup;
  }

  async removeItemGroup(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Item_Group.update({
      where: { id },
      data: { is_deleted: true },
    });
  }

  // Modifiers
  async createModifier(dbName: string, userId: string, dto: CreateModifierDto) {
    const client = await this.tenantService.getClient(dbName);
    const { stock_quantity, warehouseId, ...modifierData } = dto;
    const modifier = await client.s_Modifier.create({ data: modifierData });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'CREATE_MODIFIER',
      modifier,
    );

    if (stock_quantity && stock_quantity !== '0') {
      let wId = warehouseId;
      if (!wId) {
        const warehouse = await client.s_Warehouse.findFirst({
          where: { is_deleted: false },
        });
        if (warehouse) wId = warehouse.id;
      }

      if (wId) {
        console.log(
          `[Modifier] Creating stock list for modifier ${modifier.id} in warehouse ${wId} with qty ${stock_quantity}`,
        );
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
      } else {
        console.warn(
          `[Modifier] No warehouse found to save stock for modifier ${modifier.id}`,
        );
      }
    }

    return modifier;
  }

  async findAllModifiers(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Modifier.findMany({ where: { is_deleted: false } });
  }

  async findOneModifier(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Modifier.findFirst({ where: { id, is_deleted: false } });
  }

  async updateModifier(
    dbName: string,
    userId: string,
    id: string,
    dto: UpdateModifierDto,
  ) {
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
        } else {
          const warehouse = await client.s_Warehouse.findFirst({
            where: { is_deleted: false },
          });
          if (warehouse) wId = warehouse.id;
        }
      }

      if (wId) {
        console.log(
          `[Modifier Update] Updating stock for modifier ${id} in warehouse ${wId} to ${stock_quantity}`,
        );
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
        } else {
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

  async removeModifier(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Modifier.update({
      where: { id },
      data: { is_deleted: true },
    });
  }

  // Modifier Groups
  async createModifierGroup(
    dbName: string,
    userId: string,
    dto: CreateModifierGroupDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    const modifierGroup = await client.s_ModifierGroup.create({ data: dto });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'CREATE_MODIFIER_GROUP',
      modifierGroup,
    );

    return modifierGroup;
  }

  async findAllModifierGroups(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_ModifierGroup.findMany({ where: { is_deleted: false } });
  }

  async findOneModifierGroup(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_ModifierGroup.findFirst({
      where: { id, is_deleted: false },
    });
  }

  async updateModifierGroup(
    dbName: string,
    userId: string,
    id: string,
    dto: UpdateModifierGroupDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    const modifierGroup = await client.s_ModifierGroup.update({
      where: { id },
      data: dto,
    });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'UPDATE_MODIFIER_GROUP',
      modifierGroup,
    );

    return modifierGroup;
  }

  async removeModifierGroup(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_ModifierGroup.update({
      where: { id },
      data: { is_deleted: true },
    });
  }
}
