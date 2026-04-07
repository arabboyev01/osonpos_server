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
exports.UpdateMovementDto = exports.CreateMovementDto = exports.MovementItemDto = exports.UpdateCancellationDto = exports.CreateCancellationDto = exports.CancellationItemDto = exports.UpdateReceiptDto = exports.CreateReceiptDto = exports.ReceiptItemDto = exports.UpdateInventoryDto = exports.CreateInventoryDto = exports.InventoryItemDto = exports.UpdateStockListDto = exports.CreateStockListDto = exports.UpdateSupplierDto = exports.CreateSupplierDto = exports.UpdateWarehouseDto = exports.CreateWarehouseDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateWarehouseDto {
    name;
    location;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, location: { required: false, type: () => String } };
    }
}
exports.CreateWarehouseDto = CreateWarehouseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWarehouseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateWarehouseDto.prototype, "location", void 0);
class UpdateWarehouseDto {
    name;
    location;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, location: { required: false, type: () => String } };
    }
}
exports.UpdateWarehouseDto = UpdateWarehouseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWarehouseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWarehouseDto.prototype, "location", void 0);
class CreateSupplierDto {
    name;
    description;
    contact_person;
    phone_number;
    email;
    address;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: false, type: () => String }, contact_person: { required: false, type: () => String }, phone_number: { required: false, type: () => String }, email: { required: false, type: () => String }, address: { required: false, type: () => String } };
    }
}
exports.CreateSupplierDto = CreateSupplierDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSupplierDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSupplierDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSupplierDto.prototype, "contact_person", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSupplierDto.prototype, "phone_number", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSupplierDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSupplierDto.prototype, "address", void 0);
class UpdateSupplierDto {
    name;
    description;
    contact_person;
    phone_number;
    email;
    address;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, description: { required: false, type: () => String }, contact_person: { required: false, type: () => String }, phone_number: { required: false, type: () => String }, email: { required: false, type: () => String }, address: { required: false, type: () => String } };
    }
}
exports.UpdateSupplierDto = UpdateSupplierDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSupplierDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSupplierDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSupplierDto.prototype, "contact_person", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSupplierDto.prototype, "phone_number", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSupplierDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSupplierDto.prototype, "address", void 0);
class CreateStockListDto {
    itemId;
    stock_quantity;
    price;
    measureId;
    dateFrom;
    warehouseId;
    mon;
    tue;
    wed;
    thu;
    fri;
    sat;
    sun;
    static _OPENAPI_METADATA_FACTORY() {
        return { itemId: { required: true, type: () => String }, stock_quantity: { required: true, type: () => String }, price: { required: true, type: () => String }, measureId: { required: true, type: () => String }, dateFrom: { required: true, type: () => String }, warehouseId: { required: true, type: () => String }, mon: { required: false, type: () => String }, tue: { required: false, type: () => String }, wed: { required: false, type: () => String }, thu: { required: false, type: () => String }, fri: { required: false, type: () => String }, sat: { required: false, type: () => String }, sun: { required: false, type: () => String } };
    }
}
exports.CreateStockListDto = CreateStockListDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStockListDto.prototype, "itemId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStockListDto.prototype, "stock_quantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStockListDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStockListDto.prototype, "measureId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStockListDto.prototype, "dateFrom", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStockListDto.prototype, "warehouseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStockListDto.prototype, "mon", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStockListDto.prototype, "tue", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStockListDto.prototype, "wed", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStockListDto.prototype, "thu", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStockListDto.prototype, "fri", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStockListDto.prototype, "sat", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateStockListDto.prototype, "sun", void 0);
class UpdateStockListDto {
    stock_quantity;
    price;
    measureId;
    dateFrom;
    mon;
    tue;
    wed;
    thu;
    fri;
    sat;
    sun;
    static _OPENAPI_METADATA_FACTORY() {
        return { stock_quantity: { required: false, type: () => String }, price: { required: false, type: () => String }, measureId: { required: false, type: () => String }, dateFrom: { required: false, type: () => String }, mon: { required: false, type: () => String }, tue: { required: false, type: () => String }, wed: { required: false, type: () => String }, thu: { required: false, type: () => String }, fri: { required: false, type: () => String }, sat: { required: false, type: () => String }, sun: { required: false, type: () => String } };
    }
}
exports.UpdateStockListDto = UpdateStockListDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStockListDto.prototype, "stock_quantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStockListDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStockListDto.prototype, "measureId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStockListDto.prototype, "dateFrom", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStockListDto.prototype, "mon", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStockListDto.prototype, "tue", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStockListDto.prototype, "wed", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStockListDto.prototype, "thu", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStockListDto.prototype, "fri", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStockListDto.prototype, "sat", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateStockListDto.prototype, "sun", void 0);
class InventoryItemDto {
    itemId;
    quantity;
    price;
    plannedQuantity;
    measureId;
    static _OPENAPI_METADATA_FACTORY() {
        return { itemId: { required: true, type: () => String }, quantity: { required: true, type: () => String }, price: { required: true, type: () => String }, plannedQuantity: { required: true, type: () => String }, measureId: { required: true, type: () => String } };
    }
}
exports.InventoryItemDto = InventoryItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InventoryItemDto.prototype, "itemId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InventoryItemDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InventoryItemDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InventoryItemDto.prototype, "plannedQuantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InventoryItemDto.prototype, "measureId", void 0);
class CreateInventoryDto {
    guid;
    name;
    description;
    warehouseId;
    organizationId;
    total;
    totalPlanned;
    totalDiff;
    employeeId;
    clientId;
    note;
    conducted;
    items;
    static _OPENAPI_METADATA_FACTORY() {
        return { guid: { required: false, type: () => String }, name: { required: true, type: () => String }, description: { required: false, type: () => String }, warehouseId: { required: true, type: () => [String] }, organizationId: { required: true, type: () => String }, total: { required: true, type: () => String }, totalPlanned: { required: true, type: () => String }, totalDiff: { required: true, type: () => String }, employeeId: { required: true, type: () => String }, clientId: { required: true, type: () => String }, note: { required: false, type: () => String }, conducted: { required: false, type: () => Boolean }, items: { required: true, type: () => [require("./inventarization.dto").InventoryItemDto] } };
    }
}
exports.CreateInventoryDto = CreateInventoryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInventoryDto.prototype, "guid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInventoryDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInventoryDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateInventoryDto.prototype, "warehouseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInventoryDto.prototype, "organizationId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInventoryDto.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInventoryDto.prototype, "totalPlanned", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInventoryDto.prototype, "totalDiff", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInventoryDto.prototype, "employeeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInventoryDto.prototype, "clientId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInventoryDto.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateInventoryDto.prototype, "conducted", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => InventoryItemDto),
    __metadata("design:type", Array)
], CreateInventoryDto.prototype, "items", void 0);
class UpdateInventoryDto {
    name;
    description;
    warehouseId;
    organizationId;
    employeeId;
    total;
    totalPlanned;
    totalDiff;
    clientId;
    note;
    conducted;
    items;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, description: { required: false, type: () => String }, warehouseId: { required: false, type: () => [String] }, organizationId: { required: false, type: () => String }, employeeId: { required: false, type: () => String }, total: { required: false, type: () => String }, totalPlanned: { required: false, type: () => String }, totalDiff: { required: false, type: () => String }, clientId: { required: false, type: () => String }, note: { required: false, type: () => String }, conducted: { required: false, type: () => Boolean }, items: { required: false, type: () => [require("./inventarization.dto").InventoryItemDto] } };
    }
}
exports.UpdateInventoryDto = UpdateInventoryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInventoryDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInventoryDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateInventoryDto.prototype, "warehouseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInventoryDto.prototype, "organizationId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInventoryDto.prototype, "employeeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInventoryDto.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInventoryDto.prototype, "totalPlanned", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInventoryDto.prototype, "totalDiff", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInventoryDto.prototype, "clientId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInventoryDto.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateInventoryDto.prototype, "conducted", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => InventoryItemDto),
    __metadata("design:type", Array)
], UpdateInventoryDto.prototype, "items", void 0);
class ReceiptItemDto {
    itemId;
    quantity;
    price;
    plannedQuantity;
    measureId;
    rounding;
    newPrice;
    static _OPENAPI_METADATA_FACTORY() {
        return { itemId: { required: true, type: () => String }, quantity: { required: true, type: () => String }, price: { required: true, type: () => String }, plannedQuantity: { required: true, type: () => String }, measureId: { required: true, type: () => String }, rounding: { required: false, type: () => String }, newPrice: { required: false, type: () => String } };
    }
}
exports.ReceiptItemDto = ReceiptItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReceiptItemDto.prototype, "itemId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReceiptItemDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReceiptItemDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReceiptItemDto.prototype, "plannedQuantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReceiptItemDto.prototype, "measureId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ReceiptItemDto.prototype, "rounding", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ReceiptItemDto.prototype, "newPrice", void 0);
class CreateReceiptDto {
    guid;
    name;
    description;
    warehouseId;
    organizationId;
    total;
    totalPlanned;
    totalDiff;
    employeeId;
    clientId;
    note;
    conducted;
    items;
    static _OPENAPI_METADATA_FACTORY() {
        return { guid: { required: false, type: () => String }, name: { required: true, type: () => String }, description: { required: false, type: () => String }, warehouseId: { required: true, type: () => [String] }, organizationId: { required: true, type: () => String }, total: { required: true, type: () => String }, totalPlanned: { required: true, type: () => String }, totalDiff: { required: true, type: () => String }, employeeId: { required: true, type: () => String }, clientId: { required: true, type: () => String }, note: { required: false, type: () => String }, conducted: { required: false, type: () => Boolean }, items: { required: true, type: () => [require("./inventarization.dto").ReceiptItemDto] } };
    }
}
exports.CreateReceiptDto = CreateReceiptDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateReceiptDto.prototype, "guid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReceiptDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateReceiptDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateReceiptDto.prototype, "warehouseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReceiptDto.prototype, "organizationId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReceiptDto.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReceiptDto.prototype, "totalPlanned", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReceiptDto.prototype, "totalDiff", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReceiptDto.prototype, "employeeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReceiptDto.prototype, "clientId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateReceiptDto.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateReceiptDto.prototype, "conducted", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ReceiptItemDto),
    __metadata("design:type", Array)
], CreateReceiptDto.prototype, "items", void 0);
class UpdateReceiptDto {
    name;
    description;
    warehouseId;
    organizationId;
    employeeId;
    total;
    totalPlanned;
    totalDiff;
    clientId;
    note;
    conducted;
    items;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, description: { required: false, type: () => String }, warehouseId: { required: false, type: () => [String] }, organizationId: { required: false, type: () => String }, employeeId: { required: false, type: () => String }, total: { required: false, type: () => String }, totalPlanned: { required: false, type: () => String }, totalDiff: { required: false, type: () => String }, clientId: { required: false, type: () => String }, note: { required: false, type: () => String }, conducted: { required: false, type: () => Boolean }, items: { required: false, type: () => [require("./inventarization.dto").ReceiptItemDto] } };
    }
}
exports.UpdateReceiptDto = UpdateReceiptDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReceiptDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReceiptDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateReceiptDto.prototype, "warehouseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReceiptDto.prototype, "organizationId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReceiptDto.prototype, "employeeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReceiptDto.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReceiptDto.prototype, "totalPlanned", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReceiptDto.prototype, "totalDiff", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReceiptDto.prototype, "clientId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReceiptDto.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateReceiptDto.prototype, "conducted", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ReceiptItemDto),
    __metadata("design:type", Array)
], UpdateReceiptDto.prototype, "items", void 0);
class CancellationItemDto {
    itemId;
    quantity;
    price;
    measureId;
    multiple;
    static _OPENAPI_METADATA_FACTORY() {
        return { itemId: { required: true, type: () => String }, quantity: { required: true, type: () => String }, price: { required: true, type: () => String }, measureId: { required: true, type: () => String }, multiple: { required: false, type: () => String } };
    }
}
exports.CancellationItemDto = CancellationItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CancellationItemDto.prototype, "itemId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CancellationItemDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CancellationItemDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CancellationItemDto.prototype, "measureId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CancellationItemDto.prototype, "multiple", void 0);
class CreateCancellationDto {
    guid;
    name;
    description;
    warehouseId;
    organizationId;
    employeeId;
    note;
    conducted;
    items;
    static _OPENAPI_METADATA_FACTORY() {
        return { guid: { required: false, type: () => String }, name: { required: true, type: () => String }, description: { required: false, type: () => String }, warehouseId: { required: true, type: () => [String] }, organizationId: { required: true, type: () => String }, employeeId: { required: true, type: () => String }, note: { required: false, type: () => String }, conducted: { required: false, type: () => Boolean }, items: { required: true, type: () => [require("./inventarization.dto").CancellationItemDto] } };
    }
}
exports.CreateCancellationDto = CreateCancellationDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCancellationDto.prototype, "guid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCancellationDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCancellationDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateCancellationDto.prototype, "warehouseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCancellationDto.prototype, "organizationId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCancellationDto.prototype, "employeeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCancellationDto.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCancellationDto.prototype, "conducted", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CancellationItemDto),
    __metadata("design:type", Array)
], CreateCancellationDto.prototype, "items", void 0);
class UpdateCancellationDto {
    name;
    description;
    warehouseId;
    organizationId;
    employeeId;
    note;
    conducted;
    items;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, description: { required: false, type: () => String }, warehouseId: { required: false, type: () => [String] }, organizationId: { required: false, type: () => String }, employeeId: { required: false, type: () => String }, note: { required: false, type: () => String }, conducted: { required: false, type: () => Boolean }, items: { required: false, type: () => [require("./inventarization.dto").CancellationItemDto] } };
    }
}
exports.UpdateCancellationDto = UpdateCancellationDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCancellationDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCancellationDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateCancellationDto.prototype, "warehouseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCancellationDto.prototype, "organizationId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCancellationDto.prototype, "employeeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCancellationDto.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateCancellationDto.prototype, "conducted", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CancellationItemDto),
    __metadata("design:type", Array)
], UpdateCancellationDto.prototype, "items", void 0);
class MovementItemDto {
    itemId;
    quantity;
    price;
    measureId;
    multiple;
    static _OPENAPI_METADATA_FACTORY() {
        return { itemId: { required: true, type: () => String }, quantity: { required: true, type: () => String }, price: { required: true, type: () => String }, measureId: { required: true, type: () => String }, multiple: { required: false, type: () => String } };
    }
}
exports.MovementItemDto = MovementItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MovementItemDto.prototype, "itemId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MovementItemDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MovementItemDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MovementItemDto.prototype, "measureId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MovementItemDto.prototype, "multiple", void 0);
class CreateMovementDto {
    guid;
    name;
    description;
    warehouseId;
    toWarehouseId;
    organizationId;
    employeeId;
    note;
    items;
    static _OPENAPI_METADATA_FACTORY() {
        return { guid: { required: false, type: () => String }, name: { required: true, type: () => String }, description: { required: false, type: () => String }, warehouseId: { required: true, type: () => String }, toWarehouseId: { required: true, type: () => String }, organizationId: { required: true, type: () => String }, employeeId: { required: true, type: () => String }, note: { required: false, type: () => String }, items: { required: true, type: () => [require("./inventarization.dto").MovementItemDto] } };
    }
}
exports.CreateMovementDto = CreateMovementDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMovementDto.prototype, "guid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMovementDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMovementDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMovementDto.prototype, "warehouseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMovementDto.prototype, "toWarehouseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMovementDto.prototype, "organizationId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMovementDto.prototype, "employeeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMovementDto.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => MovementItemDto),
    __metadata("design:type", Array)
], CreateMovementDto.prototype, "items", void 0);
class UpdateMovementDto {
    name;
    description;
    organizationId;
    employeeId;
    warehouseId;
    toWarehouseId;
    note;
    items;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, description: { required: false, type: () => String }, organizationId: { required: false, type: () => String }, employeeId: { required: false, type: () => String }, warehouseId: { required: false, type: () => String }, toWarehouseId: { required: false, type: () => String }, note: { required: false, type: () => String }, items: { required: false, type: () => [require("./inventarization.dto").MovementItemDto] } };
    }
}
exports.UpdateMovementDto = UpdateMovementDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMovementDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMovementDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMovementDto.prototype, "organizationId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMovementDto.prototype, "employeeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMovementDto.prototype, "warehouseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMovementDto.prototype, "toWarehouseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMovementDto.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => MovementItemDto),
    __metadata("design:type", Array)
], UpdateMovementDto.prototype, "items", void 0);
//# sourceMappingURL=inventarization.dto.js.map