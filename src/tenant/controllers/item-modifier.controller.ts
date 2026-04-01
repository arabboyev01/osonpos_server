import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ItemModifierService } from '../services/item-modifier.service';
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
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('item-modifier')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN')
export class ItemModifierController {
  constructor(private readonly itemModifierService: ItemModifierService) {}

  // Items
  @Post('items/create')
  createItem(@Request() req, @Body() dto: CreateItemDto) {
    return this.itemModifierService.createItem(
      req.user.dbName,
      req.user.id,
      dto,
    );
  }

  @Get('items/all')
  findAllItems(@Request() req) {
    return this.itemModifierService.findAllItems(req.user.dbName);
  }

  @Patch('items/update/:id')
  updateItem(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateItemDto,
  ) {
    return this.itemModifierService.updateItem(
      req.user.dbName,
      req.user.id,
      id,
      dto,
    );
  }

  @Delete('items/delete/:id')
  removeItem(@Request() req, @Param('id') id: string) {
    return this.itemModifierService.removeItem(req.user.dbName, id);
  }

  // Item Groups
  @Post('item-groups/create')
  createItemGroup(@Request() req, @Body() dto: CreateItemGroupDto) {
    return this.itemModifierService.createItemGroup(
      req.user.dbName,
      req.user.id,
      dto,
    );
  }

  @Get('item-groups/all')
  findAllItemGroups(@Request() req) {
    return this.itemModifierService.findAllItemGroups(req.user.dbName);
  }

  @Patch('item-groups/update/:id')
  updateItemGroup(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateItemGroupDto,
  ) {
    return this.itemModifierService.updateItemGroup(
      req.user.dbName,
      req.user.id,
      id,
      dto,
    );
  }

  @Delete('item-groups/delete/:id')
  removeItemGroup(@Request() req, @Param('id') id: string) {
    return this.itemModifierService.removeItemGroup(req.user.dbName, id);
  }

  // Modifiers
  @Post('modifiers/create')
  createModifier(@Request() req, @Body() dto: CreateModifierDto) {
    return this.itemModifierService.createModifier(
      req.user.dbName,
      req.user.id,
      dto,
    );
  }

  @Get('modifiers/all')
  findAllModifiers(@Request() req) {
    return this.itemModifierService.findAllModifiers(req.user.dbName);
  }

  @Patch('modifiers/update/:id')
  updateModifier(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateModifierDto,
  ) {
    return this.itemModifierService.updateModifier(
      req.user.dbName,
      req.user.id,
      id,
      dto,
    );
  }

  @Delete('modifiers/delete/:id')
  removeModifier(@Request() req, @Param('id') id: string) {
    return this.itemModifierService.removeModifier(req.user.dbName, id);
  }

  // Modifier Groups
  @Post('modifier-groups/create')
  createModifierGroup(@Request() req, @Body() dto: CreateModifierGroupDto) {
    return this.itemModifierService.createModifierGroup(
      req.user.dbName,
      req.user.id,
      dto,
    );
  }

  @Get('modifier-groups/all')
  findAllModifierGroups(@Request() req) {
    return this.itemModifierService.findAllModifierGroups(req.user.dbName);
  }

  @Patch('modifier-groups/update/:id')
  updateModifierGroup(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateModifierGroupDto,
  ) {
    return this.itemModifierService.updateModifierGroup(
      req.user.dbName,
      req.user.id,
      id,
      dto,
    );
  }

  @Delete('modifier-groups/delete/:id')
  removeModifierGroup(@Request() req, @Param('id') id: string) {
    return this.itemModifierService.removeModifierGroup(req.user.dbName, id);
  }
}
