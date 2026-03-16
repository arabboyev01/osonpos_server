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

@Injectable()
export class ItemModifierService {
  constructor(private tenantService: TenantService) {}

  // Items
  async createItem(dbName: string, dto: CreateItemDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Item.create({ data: dto });
  }

  async findAllItems(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Item.findMany({ where: { is_deleted: false } });
  }

  async findOneItem(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Item.findFirst({ where: { id, is_deleted: false } });
  }

  async updateItem(dbName: string, id: string, dto: UpdateItemDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Item.update({ where: { id }, data: dto });
  }

  async removeItem(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Item.update({ where: { id }, data: { is_deleted: true } });
  }

  // Item Groups
  async createItemGroup(dbName: string, dto: CreateItemGroupDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Item_Group.create({ data: dto });
  }

  async findAllItemGroups(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Item_Group.findMany({ where: { is_deleted: false } });
  }

  async findOneItemGroup(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Item_Group.findFirst({ where: { id, is_deleted: false } });
  }

  async updateItemGroup(dbName: string, id: string, dto: UpdateItemGroupDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Item_Group.update({ where: { id }, data: dto });
  }

  async removeItemGroup(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Item_Group.update({
      where: { id },
      data: { is_deleted: true },
    });
  }

  // Modifiers
  async createModifier(dbName: string, dto: CreateModifierDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Modifier.create({ data: dto });
  }

  async findAllModifiers(dbName: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Modifier.findMany({ where: { is_deleted: false } });
  }

  async findOneModifier(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Modifier.findFirst({ where: { id, is_deleted: false } });
  }

  async updateModifier(dbName: string, id: string, dto: UpdateModifierDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Modifier.update({ where: { id }, data: dto });
  }

  async removeModifier(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_Modifier.update({
      where: { id },
      data: { is_deleted: true },
    });
  }

  // Modifier Groups
  async createModifierGroup(dbName: string, dto: CreateModifierGroupDto) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_ModifierGroup.create({ data: dto });
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
    id: string,
    dto: UpdateModifierGroupDto,
  ) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_ModifierGroup.update({ where: { id }, data: dto });
  }

  async removeModifierGroup(dbName: string, id: string) {
    const client = await this.tenantService.getClient(dbName);
    return client.s_ModifierGroup.update({
      where: { id },
      data: { is_deleted: true },
    });
  }
}
