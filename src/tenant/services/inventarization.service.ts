import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantService } from '../tenant.service';
import {
  CreateWarehouseDto,
  UpdateWarehouseDto,
  CreateSupplierDto,
  UpdateSupplierDto,
  CreateStockListDto,
  UpdateStockListDto,
  CreateInventoryDto,
  UpdateInventoryDto,
  CreateReceiptDto,
  UpdateReceiptDto,
  CreateCancellationDto,
  UpdateCancellationDto,
  CreateMovementDto,
  UpdateMovementDto,
} from '../dto/inventarization.dto';

import { LogService } from './log.service';

@Injectable()
export class InventarizationService {
  constructor(
    private tenantService: TenantService,
    private logService: LogService,
  ) {}

  // --- Warehouse ---
  async createWarehouse(
    dbName: string,
    userId: string,
    dto: CreateWarehouseDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    const warehouse = await client.s_Warehouse.create({ data: dto });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'CREATE_WAREHOUSE',
      warehouse,
    );

    return warehouse;
  }

  async findAllWarehouses(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Warehouse.findMany({ where: { is_deleted: false } });
  }

  async findOneWarehouse(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    const warehouse = await client.s_Warehouse.findFirst({
      where: { id, is_deleted: false },
    });
    if (!warehouse) throw new NotFoundException('Warehouse not found');
    return warehouse;
  }

  async updateWarehouse(
    dbName: string,
    userId: string,
    id: string,
    dto: UpdateWarehouseDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    const warehouse = await client.s_Warehouse.update({
      where: { id },
      data: dto,
    });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'UPDATE_WAREHOUSE',
      warehouse,
    );

    return warehouse;
  }

  async removeWarehouse(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Warehouse.update({
      where: { id },
      data: { is_deleted: true },
    });
  }

  // --- Supplier ---
  async createSupplier(dbName: string, userId: string, dto: CreateSupplierDto) {
    const client = await this.tenantService.getClient(dbName);
    const supplier = await client.s_Supplier.create({ data: dto });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'CREATE_SUPPLIER',
      supplier,
    );

    return supplier;
  }

  async findAllSuppliers(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Supplier.findMany({ where: { is_deleted: false } });
  }

  async findOneSupplier(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    const supplier = await client.s_Supplier.findFirst({
      where: { id, is_deleted: false },
    });
    if (!supplier) throw new NotFoundException('Supplier not found');
    return supplier;
  }

  async updateSupplier(
    dbName: string,
    userId: string,
    id: string,
    dto: UpdateSupplierDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    const supplier = await client.s_Supplier.update({
      where: { id },
      data: dto,
    });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'UPDATE_SUPPLIER',
      supplier,
    );

    return supplier;
  }

  async removeSupplier(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Supplier.update({
      where: { id },
      data: { is_deleted: true },
    });
  }

  // --- Stock List ---
  async createStockList(
    dbName: string,
    userId: string,
    dto: CreateStockListDto,
  ) {
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

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'CREATE_STOCK_LIST',
      stock,
    );

    return stock;
  }

  async findAllStockLists(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Stock_List.findMany({ where: { is_deleted: false } });
  }

  async findOneStockList(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    const stock = await client.s_Stock_List.findFirst({
      where: { id, is_deleted: false },
    });
    if (!stock) throw new NotFoundException('Stock item not found');
    return stock;
  }

  async updateStockList(
    dbName: string,
    userId: string,
    id: string,
    dto: UpdateStockListDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    const stock = await client.s_Stock_List.update({
      where: { id },
      data: dto,
    });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'UPDATE_STOCK_LIST',
      stock,
    );

    return stock;
  }

  async removeStockList(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Stock_List.update({
      where: { id },
      data: { is_deleted: true },
    });
  }

  // --- Inventory ---
  async createInventory(
    dbName: string,
    userId: string,
    dto: CreateInventoryDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    const { items, ...data } = dto;
    const inventory = await client.d_Inventory.create({ data });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'CREATE_INVENTORY',
      inventory,
    );

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
        // Redefine stock for each warehouse in the list
        for (const wId of dto.warehouseId) {
          await this.updateStockQuantity(
            dbName,
            item.itemId,
            wId,
            item.quantity,
            'REPLACE',
            item.price,
            item.measureId,
            client,
          );
        }
      }
    }

    return inventory;
  }

  async findAllInventories(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.d_Inventory.findMany({ where: { is_deleted: false } });
  }

  async findOneInventory(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    const [header, items] = await Promise.all([
      client.d_Inventory.findFirst({ where: { id, is_deleted: false } }),
      client.t_Inventory.findMany({
        where: { inventoryId: id, is_deleted: false },
      }),
    ]);
    if (!header) throw new NotFoundException('Inventory not found');
    return { ...header, items };
  }

  async removeInventory(dbName: string, id: string) {
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

  async updateInventory(
    dbName: string,
    userId: string,
    id: string,
    dto: UpdateInventoryDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    const current = await client.d_Inventory.findFirst({ where: { id } });
    if (!current) throw new NotFoundException('Inventory not found');

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

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'UPDATE_INVENTORY',
      updated,
    );

    if (!current.conducted && updated.conducted) {
      const itemsToUse =
        items ||
        (await client.t_Inventory.findMany({
          where: { inventoryId: id, is_deleted: false },
        }));
      for (const item of itemsToUse) {
        for (const wId of updated.warehouseId) {
          await this.updateStockQuantity(
            dbName,
            item.itemId,
            wId,
            item.quantity,
            'REPLACE',
            item.price,
            item.measureId,
            client,
          );
        }
      }
    }

    return updated;
  }

  // --- Receipt ---
  async createReceipt(dbName: string, userId: string, dto: CreateReceiptDto) {
    const client = await this.tenantService.getClient(dbName);
    const { items, ...data } = dto;
    const receipt = await client.d_Receipt.create({ data });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'CREATE_RECEIPT',
      receipt,
    );

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
          await this.updateStockQuantity(
            dbName,
            item.itemId,
            wId,
            item.quantity,
            'ADD',
            item.price,
            item.measureId,
            client,
          );
        }
      }
    }

    return receipt;
  }

  async findAllReceipts(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.d_Receipt.findMany({ where: { is_deleted: false } });
  }

  async findOneReceipt(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    const [header, items] = await Promise.all([
      client.d_Receipt.findFirst({ where: { id, is_deleted: false } }),
      client.t_Receipt.findMany({
        where: { receiptId: id, is_deleted: false },
      }),
    ]);
    if (!header) throw new NotFoundException('Receipt not found');
    return { ...header, items };
  }

  async removeReceipt(dbName: string, id: string) {
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

  async updateReceipt(
    dbName: string,
    userId: string,
    id: string,
    dto: UpdateReceiptDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    const current = await client.d_Receipt.findFirst({ where: { id } });
    if (!current) throw new NotFoundException('Receipt not found');

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

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'UPDATE_RECEIPT',
      updated,
    );

    if (!current.conducted && updated.conducted) {
      const itemsToUse =
        items ||
        (await client.t_Receipt.findMany({
          where: { receiptId: id, is_deleted: false },
        }));
      for (const item of itemsToUse) {
        for (const wId of updated.warehouseId) {
          await this.updateStockQuantity(
            dbName,
            item.itemId,
            wId,
            item.quantity,
            'ADD',
            item.price,
            item.measureId,
            client,
          );
        }
      }
    }

    return updated;
  }

  // --- Cancellation (Write-off) ---
  async createCancellation(
    dbName: string,
    userId: string,
    dto: CreateCancellationDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    const { items, ...data } = dto;
    const cancellation = await client.d_Cancellation.create({ data });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'CREATE_CANCELLATION',
      cancellation,
    );

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
          await this.updateStockQuantity(
            dbName,
            item.itemId,
            wId,
            item.quantity,
            'SUBTRACT',
            item.price,
            item.measureId,
            client,
          );
        }
      }
    }

    return cancellation;
  }

  async findAllCancellations(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.d_Cancellation.findMany({ where: { is_deleted: false } });
  }

  async findOneCancellation(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    const [header, items] = await Promise.all([
      client.d_Cancellation.findFirst({ where: { id, is_deleted: false } }),
      client.t_Cancellation.findMany({
        where: { cancellationId: id, is_deleted: false },
      }),
    ]);
    if (!header) throw new NotFoundException('Cancellation not found');
    return { ...header, items };
  }

  async removeCancellation(dbName: string, id: string) {
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

  async updateCancellation(
    dbName: string,
    userId: string,
    id: string,
    dto: UpdateCancellationDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    const current = await client.d_Cancellation.findFirst({ where: { id } });
    if (!current) throw new NotFoundException('Cancellation not found');

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

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'UPDATE_CANCELLATION',
      updated,
    );

    if (!current.conducted && updated.conducted) {
      const itemsToUse =
        items ||
        (await client.t_Cancellation.findMany({
          where: { cancellationId: id, is_deleted: false },
        }));
      for (const item of itemsToUse) {
        for (const wId of updated.warehouseId) {
          await this.updateStockQuantity(
            dbName,
            item.itemId,
            wId,
            item.quantity,
            'SUBTRACT',
            item.price,
            item.measureId,
            client,
          );
        }
      }
    }

    return updated;
  }

  // --- Movement ---
  async createMovement(dbName: string, userId: string, dto: CreateMovementDto) {
    const client = await this.tenantService.getClient(dbName);
    const { items, ...data } = dto;
    const movement = await client.d_Movement.create({ data });

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'CREATE_MOVEMENT',
      movement,
    );

    if (items && items.length > 0) {
      await client.t_Movement.createMany({
        data: items.map((item) => ({
          ...item,
          movementId: movement.id,
        })),
      });
    }

    // Movements usually happen immediately
    for (const item of items) {
      // Subtract from source
      await this.updateStockQuantity(
        dbName,
        item.itemId,
        dto.warehouseId,
        item.quantity,
        'SUBTRACT',
        item.price,
        item.measureId,
        client,
      );
      // Add to destination
      await this.updateStockQuantity(
        dbName,
        item.itemId,
        dto.toWarehouseId,
        item.quantity,
        'ADD',
        item.price,
        item.measureId,
        client,
      );
    }

    return movement;
  }

  async findAllMovements(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.d_Movement.findMany({ where: { is_deleted: false } });
  }

  async findOneMovement(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    const [header, items] = await Promise.all([
      client.d_Movement.findFirst({ where: { id, is_deleted: false } }),
      client.t_Movement.findMany({
        where: { movementId: id, is_deleted: false },
      }),
    ]);
    if (!header) throw new NotFoundException('Movement not found');
    return { ...header, items };
  }

  async removeMovement(dbName: string, id: string) {
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

  async updateMovement(
    dbName: string,
    userId: string,
    id: string,
    dto: UpdateMovementDto,
  ) {
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

    await this.logService.recordLog(
      dbName,
      userId,
      'SYSTEM',
      'UPDATE_MOVEMENT',
      updated,
    );

    return updated;
  }

  // --- Private Helper ---
  async updateStockQuantity(
    dbName: string,
    itemId: string,
    warehouseId: string,
    quantityStr: string,
    mode: 'ADD' | 'SUBTRACT' | 'REPLACE',
    price: string,
    measureId: string,
    tx?: any,
  ) {
    const client = tx || (await this.tenantService.getClient(dbName));
    const quantity = parseFloat(quantityStr);

    const stock = await client.s_Stock_List.findFirst({
      where: { itemId, warehouseId, is_deleted: false },
    });

    if (stock) {
      let newQuantity = parseFloat(stock.stock_quantity);
      if (mode === 'ADD') newQuantity += quantity;
      else if (mode === 'SUBTRACT') newQuantity -= quantity;
      else if (mode === 'REPLACE') newQuantity = quantity;

      return client.s_Stock_List.update({
        where: { id: stock.id },
        data: {
          stock_quantity: newQuantity.toString(),
          price,
          measureId,
          dt_updated: new Date(),
        },
      });
    } else {
      let finalQuantity = quantity;
      if (mode === 'SUBTRACT') finalQuantity = -quantity;

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
}
