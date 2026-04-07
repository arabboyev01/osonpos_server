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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateModifierGroupDto = exports.CreateModifierGroupDto = exports.UpdateModifierDto = exports.CreateModifierDto = exports.UpdateItemGroupDto = exports.CreateItemGroupDto = exports.UpdateItemDto = exports.CreateItemDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateItemDto {
    group_id;
    name;
    description;
    search_name;
    measurement;
    price;
    cost;
    shtrix;
    color;
    type;
    pictures;
    is_menu;
    is_service;
    allow_pickup;
    allow_delivery;
    id_automated_point;
    tax_id;
    discount_id;
    stock_quantity;
    warehouseId;
    static _OPENAPI_METADATA_FACTORY() {
        return { group_id: { required: false, type: () => String }, name: { required: true, type: () => String }, description: { required: false, type: () => String }, search_name: { required: false, type: () => String }, measurement: { required: true, type: () => String }, price: { required: true, type: () => String }, cost: { required: false, type: () => String }, shtrix: { required: false, type: () => String }, color: { required: false, type: () => String }, type: { required: true, type: () => Object }, pictures: { required: false, type: () => [String] }, is_menu: { required: false, type: () => Boolean }, is_service: { required: false, type: () => Boolean }, allow_pickup: { required: false, type: () => Boolean }, allow_delivery: { required: false, type: () => Boolean }, id_automated_point: { required: false, type: () => String }, tax_id: { required: false, type: () => String }, discount_id: { required: false, type: () => String }, stock_quantity: { required: false, type: () => String }, warehouseId: { required: false, type: () => String } };
    }
}
exports.CreateItemDto = CreateItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemDto.prototype, "group_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateItemDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemDto.prototype, "search_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateItemDto.prototype, "measurement", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateItemDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemDto.prototype, "cost", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemDto.prototype, "shtrix", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.S_Item_Type),
    __metadata("design:type", String)
], CreateItemDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateItemDto.prototype, "pictures", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateItemDto.prototype, "is_menu", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateItemDto.prototype, "is_service", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateItemDto.prototype, "allow_pickup", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateItemDto.prototype, "allow_delivery", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemDto.prototype, "id_automated_point", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemDto.prototype, "tax_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemDto.prototype, "discount_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemDto.prototype, "stock_quantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemDto.prototype, "warehouseId", void 0);
class UpdateItemDto {
    group_id;
    name;
    description;
    search_name;
    measurement;
    price;
    cost;
    shtrix;
    color;
    type;
    pictures;
    is_menu;
    is_service;
    allow_pickup;
    allow_delivery;
    id_automated_point;
    tax_id;
    discount_id;
    stock_quantity;
    warehouseId;
    static _OPENAPI_METADATA_FACTORY() {
        return { group_id: { required: false, type: () => String }, name: { required: false, type: () => String }, description: { required: false, type: () => String }, search_name: { required: false, type: () => String }, measurement: { required: false, type: () => String }, price: { required: false, type: () => String }, cost: { required: false, type: () => String }, shtrix: { required: false, type: () => String }, color: { required: false, type: () => String }, type: { required: false, type: () => Object }, pictures: { required: false, type: () => [String] }, is_menu: { required: false, type: () => Boolean }, is_service: { required: false, type: () => Boolean }, allow_pickup: { required: false, type: () => Boolean }, allow_delivery: { required: false, type: () => Boolean }, id_automated_point: { required: false, type: () => String }, tax_id: { required: false, type: () => String }, discount_id: { required: false, type: () => String }, stock_quantity: { required: false, type: () => String }, warehouseId: { required: false, type: () => String } };
    }
}
exports.UpdateItemDto = UpdateItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemDto.prototype, "group_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemDto.prototype, "search_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemDto.prototype, "measurement", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemDto.prototype, "cost", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemDto.prototype, "shtrix", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.S_Item_Type),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateItemDto.prototype, "pictures", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateItemDto.prototype, "is_menu", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateItemDto.prototype, "is_service", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateItemDto.prototype, "allow_pickup", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateItemDto.prototype, "allow_delivery", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemDto.prototype, "id_automated_point", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemDto.prototype, "tax_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemDto.prototype, "discount_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemDto.prototype, "stock_quantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemDto.prototype, "warehouseId", void 0);
class CreateItemGroupDto {
    name;
    description;
    search_name;
    measurement;
    price;
    cost;
    shtrix;
    color;
    pictures;
    is_menu;
    is_service;
    allow_pickup;
    allow_delivery;
    id_automated_point;
    tax_id;
    discount_id;
    type;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: false, type: () => String }, search_name: { required: false, type: () => String }, measurement: { required: true, type: () => String }, price: { required: true, type: () => String }, cost: { required: false, type: () => String }, shtrix: { required: false, type: () => String }, color: { required: false, type: () => String }, pictures: { required: false, type: () => [String] }, is_menu: { required: false, type: () => Boolean }, is_service: { required: false, type: () => Boolean }, allow_pickup: { required: false, type: () => Boolean }, allow_delivery: { required: false, type: () => Boolean }, id_automated_point: { required: false, type: () => String }, tax_id: { required: false, type: () => String }, discount_id: { required: false, type: () => String }, type: { required: true, type: () => Object } };
    }
}
exports.CreateItemGroupDto = CreateItemGroupDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateItemGroupDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemGroupDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemGroupDto.prototype, "search_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateItemGroupDto.prototype, "measurement", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateItemGroupDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemGroupDto.prototype, "cost", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemGroupDto.prototype, "shtrix", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemGroupDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateItemGroupDto.prototype, "pictures", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateItemGroupDto.prototype, "is_menu", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateItemGroupDto.prototype, "is_service", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateItemGroupDto.prototype, "allow_pickup", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateItemGroupDto.prototype, "allow_delivery", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemGroupDto.prototype, "id_automated_point", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemGroupDto.prototype, "tax_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemGroupDto.prototype, "discount_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.S_Item_Type),
    __metadata("design:type", String)
], CreateItemGroupDto.prototype, "type", void 0);
class UpdateItemGroupDto {
    name;
    description;
    search_name;
    measurement;
    price;
    cost;
    shtrix;
    color;
    pictures;
    is_menu;
    is_service;
    allow_pickup;
    allow_delivery;
    id_automated_point;
    tax_id;
    discount_id;
    type;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, description: { required: false, type: () => String }, search_name: { required: false, type: () => String }, measurement: { required: false, type: () => String }, price: { required: false, type: () => String }, cost: { required: false, type: () => String }, shtrix: { required: false, type: () => String }, color: { required: false, type: () => String }, pictures: { required: false, type: () => [String] }, is_menu: { required: false, type: () => Boolean }, is_service: { required: false, type: () => Boolean }, allow_pickup: { required: false, type: () => Boolean }, allow_delivery: { required: false, type: () => Boolean }, id_automated_point: { required: false, type: () => String }, tax_id: { required: false, type: () => String }, discount_id: { required: false, type: () => String }, type: { required: false, type: () => Object } };
    }
}
exports.UpdateItemGroupDto = UpdateItemGroupDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemGroupDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemGroupDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemGroupDto.prototype, "search_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemGroupDto.prototype, "measurement", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemGroupDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemGroupDto.prototype, "cost", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemGroupDto.prototype, "shtrix", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemGroupDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateItemGroupDto.prototype, "pictures", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateItemGroupDto.prototype, "is_menu", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateItemGroupDto.prototype, "is_service", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateItemGroupDto.prototype, "allow_pickup", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateItemGroupDto.prototype, "allow_delivery", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemGroupDto.prototype, "id_automated_point", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemGroupDto.prototype, "tax_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemGroupDto.prototype, "discount_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.S_Item_Type),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateItemGroupDto.prototype, "type", void 0);
class CreateModifierDto {
    group_id;
    name;
    item_id;
    description;
    search_name;
    measurement;
    price;
    cost;
    shtrix;
    color;
    type;
    pictures;
    is_menu;
    is_service;
    allow_pickup;
    allow_delivery;
    id_automated_point;
    tax_id;
    discount_id;
    stock_quantity;
    warehouseId;
    static _OPENAPI_METADATA_FACTORY() {
        return { group_id: { required: false, type: () => String }, name: { required: true, type: () => String }, item_id: { required: false, type: () => String }, description: { required: false, type: () => String }, search_name: { required: false, type: () => String }, measurement: { required: true, type: () => String }, price: { required: true, type: () => String }, cost: { required: false, type: () => String }, shtrix: { required: false, type: () => String }, color: { required: false, type: () => String }, type: { required: true, type: () => Object }, pictures: { required: false, type: () => [String] }, is_menu: { required: false, type: () => Boolean }, is_service: { required: false, type: () => Boolean }, allow_pickup: { required: false, type: () => Boolean }, allow_delivery: { required: false, type: () => Boolean }, id_automated_point: { required: false, type: () => String }, tax_id: { required: false, type: () => String }, discount_id: { required: false, type: () => String }, stock_quantity: { required: false, type: () => String }, warehouseId: { required: false, type: () => String } };
    }
}
exports.CreateModifierDto = CreateModifierDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModifierDto.prototype, "group_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateModifierDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModifierDto.prototype, "item_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModifierDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModifierDto.prototype, "search_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateModifierDto.prototype, "measurement", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateModifierDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModifierDto.prototype, "cost", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModifierDto.prototype, "shtrix", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModifierDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.S_Item_Type),
    __metadata("design:type", String)
], CreateModifierDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateModifierDto.prototype, "pictures", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateModifierDto.prototype, "is_menu", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateModifierDto.prototype, "is_service", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateModifierDto.prototype, "allow_pickup", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateModifierDto.prototype, "allow_delivery", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModifierDto.prototype, "id_automated_point", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModifierDto.prototype, "tax_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModifierDto.prototype, "discount_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModifierDto.prototype, "stock_quantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModifierDto.prototype, "warehouseId", void 0);
class UpdateModifierDto {
    group_id;
    name;
    item_id;
    description;
    search_name;
    measurement;
    price;
    cost;
    shtrix;
    color;
    type;
    pictures;
    is_menu;
    is_service;
    allow_pickup;
    allow_delivery;
    id_automated_point;
    tax_id;
    discount_id;
    stock_quantity;
    warehouseId;
    static _OPENAPI_METADATA_FACTORY() {
        return { group_id: { required: false, type: () => String }, name: { required: false, type: () => String }, item_id: { required: false, type: () => String }, description: { required: false, type: () => String }, search_name: { required: false, type: () => String }, measurement: { required: false, type: () => String }, price: { required: false, type: () => String }, cost: { required: false, type: () => String }, shtrix: { required: false, type: () => String }, color: { required: false, type: () => String }, type: { required: false, type: () => Object }, pictures: { required: false, type: () => [String] }, is_menu: { required: false, type: () => Boolean }, is_service: { required: false, type: () => Boolean }, allow_pickup: { required: false, type: () => Boolean }, allow_delivery: { required: false, type: () => Boolean }, id_automated_point: { required: false, type: () => String }, tax_id: { required: false, type: () => String }, discount_id: { required: false, type: () => String }, stock_quantity: { required: false, type: () => String }, warehouseId: { required: false, type: () => String } };
    }
}
exports.UpdateModifierDto = UpdateModifierDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierDto.prototype, "group_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierDto.prototype, "item_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierDto.prototype, "search_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierDto.prototype, "measurement", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierDto.prototype, "cost", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierDto.prototype, "shtrix", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.S_Item_Type),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateModifierDto.prototype, "pictures", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateModifierDto.prototype, "is_menu", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateModifierDto.prototype, "is_service", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateModifierDto.prototype, "allow_pickup", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateModifierDto.prototype, "allow_delivery", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierDto.prototype, "id_automated_point", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierDto.prototype, "tax_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierDto.prototype, "discount_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierDto.prototype, "stock_quantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierDto.prototype, "warehouseId", void 0);
class CreateModifierGroupDto {
    name;
    description;
    search_name;
    measurement;
    price;
    cost;
    shtrix;
    color;
    pictures;
    type;
    is_menu;
    is_service;
    allow_pickup;
    allow_delivery;
    id_automated_point;
    tax_id;
    discount_id;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: false, type: () => String }, search_name: { required: false, type: () => String }, measurement: { required: true, type: () => String }, price: { required: true, type: () => String }, cost: { required: false, type: () => String }, shtrix: { required: false, type: () => String }, color: { required: false, type: () => String }, pictures: { required: false, type: () => [String] }, type: { required: true, type: () => Object }, is_menu: { required: false, type: () => Boolean }, is_service: { required: false, type: () => Boolean }, allow_pickup: { required: false, type: () => Boolean }, allow_delivery: { required: false, type: () => Boolean }, id_automated_point: { required: false, type: () => String }, tax_id: { required: false, type: () => String }, discount_id: { required: false, type: () => String } };
    }
}
exports.CreateModifierGroupDto = CreateModifierGroupDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateModifierGroupDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModifierGroupDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModifierGroupDto.prototype, "search_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateModifierGroupDto.prototype, "measurement", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateModifierGroupDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModifierGroupDto.prototype, "cost", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModifierGroupDto.prototype, "shtrix", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModifierGroupDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateModifierGroupDto.prototype, "pictures", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.S_Item_Type),
    __metadata("design:type", String)
], CreateModifierGroupDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateModifierGroupDto.prototype, "is_menu", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateModifierGroupDto.prototype, "is_service", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateModifierGroupDto.prototype, "allow_pickup", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateModifierGroupDto.prototype, "allow_delivery", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModifierGroupDto.prototype, "id_automated_point", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModifierGroupDto.prototype, "tax_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModifierGroupDto.prototype, "discount_id", void 0);
class UpdateModifierGroupDto {
    name;
    description;
    search_name;
    measurement;
    price;
    cost;
    shtrix;
    color;
    pictures;
    type;
    is_menu;
    is_service;
    allow_pickup;
    allow_delivery;
    id_automated_point;
    tax_id;
    discount_id;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, description: { required: false, type: () => String }, search_name: { required: false, type: () => String }, measurement: { required: false, type: () => String }, price: { required: false, type: () => String }, cost: { required: false, type: () => String }, shtrix: { required: false, type: () => String }, color: { required: false, type: () => String }, pictures: { required: false, type: () => [String] }, type: { required: false, type: () => Object }, is_menu: { required: false, type: () => Boolean }, is_service: { required: false, type: () => Boolean }, allow_pickup: { required: false, type: () => Boolean }, allow_delivery: { required: false, type: () => Boolean }, id_automated_point: { required: false, type: () => String }, tax_id: { required: false, type: () => String }, discount_id: { required: false, type: () => String } };
    }
}
exports.UpdateModifierGroupDto = UpdateModifierGroupDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierGroupDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierGroupDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierGroupDto.prototype, "search_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierGroupDto.prototype, "measurement", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierGroupDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierGroupDto.prototype, "cost", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierGroupDto.prototype, "shtrix", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierGroupDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateModifierGroupDto.prototype, "pictures", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.S_Item_Type),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierGroupDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateModifierGroupDto.prototype, "is_menu", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateModifierGroupDto.prototype, "is_service", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateModifierGroupDto.prototype, "allow_pickup", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateModifierGroupDto.prototype, "allow_delivery", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierGroupDto.prototype, "id_automated_point", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierGroupDto.prototype, "tax_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateModifierGroupDto.prototype, "discount_id", void 0);
//# sourceMappingURL=item-modifier.dto.js.map