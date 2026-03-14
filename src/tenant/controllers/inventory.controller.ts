import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { InventoryService } from '../services/inventory.service';
import { 
  CreateItemDto, UpdateItemDto,
  CreateItemGroupDto, UpdateItemGroupDto,
  CreateModifierDto, UpdateModifierDto,
  CreateModifierGroupDto, UpdateModifierGroupDto
} from '../dto/inventory.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  // Items
  @Post('items/create')
  createItem(@Request() req, @Body() dto: CreateItemDto) {
    return this.inventoryService.createItem(req.user.dbName, dto);
  }

  @Get('items/all')
  findAllItems(@Request() req) {
    return this.inventoryService.findAllItems(req.user.dbName);
  }

  @Patch('items/update/:id')
  updateItem(@Request() req, @Param('id') id: string, @Body() dto: UpdateItemDto) {
    return this.inventoryService.updateItem(req.user.dbName, id, dto);
  }

  @Delete('items/delete/:id')
  removeItem(@Request() req, @Param('id') id: string) {
    return this.inventoryService.removeItem(req.user.dbName, id);
  }

  // Item Groups
  @Post('item-groups/create')
  createItemGroup(@Request() req, @Body() dto: CreateItemGroupDto) {
    return this.inventoryService.createItemGroup(req.user.dbName, dto);
  }

  @Get('item-groups/all')
  findAllItemGroups(@Request() req) {
    return this.inventoryService.findAllItemGroups(req.user.dbName);
  }

  @Patch('item-groups/update/:id')
  updateItemGroup(@Request() req, @Param('id') id: string, @Body() dto: UpdateItemGroupDto) {
    return this.inventoryService.updateItemGroup(req.user.dbName, id, dto);
  }

  @Delete('item-groups/delete/:id')
  removeItemGroup(@Request() req, @Param('id') id: string) {
    return this.inventoryService.removeItemGroup(req.user.dbName, id);
  }

  // Modifiers
  @Post('modifiers/create')
  createModifier(@Request() req, @Body() dto: CreateModifierDto) {
    return this.inventoryService.createModifier(req.user.dbName, dto);
  }

  @Get('modifiers/all')
  findAllModifiers(@Request() req) {
    return this.inventoryService.findAllModifiers(req.user.dbName);
  }

  @Patch('modifiers/update/:id')
  updateModifier(@Request() req, @Param('id') id: string, @Body() dto: UpdateModifierDto) {
    return this.inventoryService.updateModifier(req.user.dbName, id, dto);
  }

  @Delete('modifiers/delete/:id')
  removeModifier(@Request() req, @Param('id') id: string) {
    return this.inventoryService.removeModifier(req.user.dbName, id);
  }

  // Modifier Groups
  @Post('modifier-groups/create')
  createModifierGroup(@Request() req, @Body() dto: CreateModifierGroupDto) {
    return this.inventoryService.createModifierGroup(req.user.dbName, dto);
  }

  @Get('modifier-groups/all')
  findAllModifierGroups(@Request() req) {
    return this.inventoryService.findAllModifierGroups(req.user.dbName);
  }

  @Patch('modifier-groups/update/:id')
  updateModifierGroup(@Request() req, @Param('id') id: string, @Body() dto: UpdateModifierGroupDto) {
    return this.inventoryService.updateModifierGroup(req.user.dbName, id, dto);
  }

  @Delete('modifier-groups/delete/:id')
  removeModifierGroup(@Request() req, @Param('id') id: string) {
    return this.inventoryService.removeModifierGroup(req.user.dbName, id);
  }
}
