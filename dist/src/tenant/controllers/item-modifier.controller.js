"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemModifierController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const item_modifier_service_1 = require("../services/item-modifier.service");
const item_modifier_dto_1 = require("../dto/item-modifier.dto");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const roles_guard_1 = require("../../auth/roles.guard");
const roles_decorator_1 = require("../../auth/roles.decorator");
let ItemModifierController = class ItemModifierController {
    itemModifierService;
    constructor(itemModifierService) {
        this.itemModifierService = itemModifierService;
    }
    createItem(req, dto) {
        return this.itemModifierService.createItem(req.user.dbName, req.user.id, dto);
    }
    findAllItems(req) {
        return this.itemModifierService.findAllItems(req.user.dbName, req.user.workplaceId);
    }
    updateItem(req, id, dto) {
        return this.itemModifierService.updateItem(req.user.dbName, req.user.id, id, dto);
    }
    removeItem(req, id) {
        return this.itemModifierService.removeItem(req.user.dbName, id);
    }
    createItemGroup(req, dto) {
        return this.itemModifierService.createItemGroup(req.user.dbName, req.user.id, dto);
    }
    findAllItemGroups(req) {
        return this.itemModifierService.findAllItemGroups(req.user.dbName, req.user.workplaceId);
    }
    updateItemGroup(req, id, dto) {
        return this.itemModifierService.updateItemGroup(req.user.dbName, req.user.id, id, dto);
    }
    removeItemGroup(req, id) {
        return this.itemModifierService.removeItemGroup(req.user.dbName, id);
    }
    createModifier(req, dto) {
        return this.itemModifierService.createModifier(req.user.dbName, req.user.id, dto);
    }
    findAllModifiers(req) {
        return this.itemModifierService.findAllModifiers(req.user.dbName, req.user.workplaceId);
    }
    updateModifier(req, id, dto) {
        return this.itemModifierService.updateModifier(req.user.dbName, req.user.id, id, dto);
    }
    removeModifier(req, id) {
        return this.itemModifierService.removeModifier(req.user.dbName, id);
    }
    createModifierGroup(req, dto) {
        return this.itemModifierService.createModifierGroup(req.user.dbName, req.user.id, dto);
    }
    findAllModifierGroups(req) {
        return this.itemModifierService.findAllModifierGroups(req.user.dbName, req.user.workplaceId);
    }
    updateModifierGroup(req, id, dto) {
        return this.itemModifierService.updateModifierGroup(req.user.dbName, req.user.id, id, dto);
    }
    removeModifierGroup(req, id) {
        return this.itemModifierService.removeModifierGroup(req.user.dbName, id);
    }
};
exports.ItemModifierController = ItemModifierController;
__decorate([
    (0, common_1.Post)('items/create'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, item_modifier_dto_1.CreateItemDto]),
    __metadata("design:returntype", void 0)
], ItemModifierController.prototype, "createItem", null);
__decorate([
    (0, common_1.Get)('items/all'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ItemModifierController.prototype, "findAllItems", null);
__decorate([
    (0, common_1.Patch)('items/update/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, item_modifier_dto_1.UpdateItemDto]),
    __metadata("design:returntype", void 0)
], ItemModifierController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)('items/delete/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ItemModifierController.prototype, "removeItem", null);
__decorate([
    (0, common_1.Post)('item-groups/create'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, item_modifier_dto_1.CreateItemGroupDto]),
    __metadata("design:returntype", void 0)
], ItemModifierController.prototype, "createItemGroup", null);
__decorate([
    (0, common_1.Get)('item-groups/all'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ItemModifierController.prototype, "findAllItemGroups", null);
__decorate([
    (0, common_1.Patch)('item-groups/update/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, item_modifier_dto_1.UpdateItemGroupDto]),
    __metadata("design:returntype", void 0)
], ItemModifierController.prototype, "updateItemGroup", null);
__decorate([
    (0, common_1.Delete)('item-groups/delete/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ItemModifierController.prototype, "removeItemGroup", null);
__decorate([
    (0, common_1.Post)('modifiers/create'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, item_modifier_dto_1.CreateModifierDto]),
    __metadata("design:returntype", void 0)
], ItemModifierController.prototype, "createModifier", null);
__decorate([
    (0, common_1.Get)('modifiers/all'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ItemModifierController.prototype, "findAllModifiers", null);
__decorate([
    (0, common_1.Patch)('modifiers/update/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, item_modifier_dto_1.UpdateModifierDto]),
    __metadata("design:returntype", void 0)
], ItemModifierController.prototype, "updateModifier", null);
__decorate([
    (0, common_1.Delete)('modifiers/delete/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ItemModifierController.prototype, "removeModifier", null);
__decorate([
    (0, common_1.Post)('modifier-groups/create'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, item_modifier_dto_1.CreateModifierGroupDto]),
    __metadata("design:returntype", void 0)
], ItemModifierController.prototype, "createModifierGroup", null);
__decorate([
    (0, common_1.Get)('modifier-groups/all'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ItemModifierController.prototype, "findAllModifierGroups", null);
__decorate([
    (0, common_1.Patch)('modifier-groups/update/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, item_modifier_dto_1.UpdateModifierGroupDto]),
    __metadata("design:returntype", void 0)
], ItemModifierController.prototype, "updateModifierGroup", null);
__decorate([
    (0, common_1.Delete)('modifier-groups/delete/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ItemModifierController.prototype, "removeModifierGroup", null);
exports.ItemModifierController = ItemModifierController = __decorate([
    (0, common_1.Controller)('item-modifier'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('OWNER', 'ADMIN', 'EMPLOYEE'),
    __metadata("design:paramtypes", [item_modifier_service_1.ItemModifierService])
], ItemModifierController);
//# sourceMappingURL=item-modifier.controller.js.map