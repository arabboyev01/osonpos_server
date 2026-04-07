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
exports.UpdateDiscountDto = exports.CreateDiscountDto = exports.UpdateTaxFeeDto = exports.CreateTaxFeeDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateTaxFeeDto {
    guid;
    name;
    tax_percent;
    tax_value;
    fee_percent;
    fee_value;
    id_automated_point;
    static _OPENAPI_METADATA_FACTORY() {
        return { guid: { required: false, type: () => String }, name: { required: true, type: () => String }, tax_percent: { required: false, type: () => String }, tax_value: { required: false, type: () => String }, fee_percent: { required: false, type: () => String }, fee_value: { required: false, type: () => String }, id_automated_point: { required: false, type: () => String } };
    }
}
exports.CreateTaxFeeDto = CreateTaxFeeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTaxFeeDto.prototype, "guid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTaxFeeDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTaxFeeDto.prototype, "tax_percent", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTaxFeeDto.prototype, "tax_value", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTaxFeeDto.prototype, "fee_percent", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTaxFeeDto.prototype, "fee_value", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTaxFeeDto.prototype, "id_automated_point", void 0);
class UpdateTaxFeeDto {
    guid;
    name;
    tax_percent;
    tax_value;
    fee_percent;
    fee_value;
    id_automated_point;
    static _OPENAPI_METADATA_FACTORY() {
        return { guid: { required: false, type: () => String }, name: { required: false, type: () => String }, tax_percent: { required: false, type: () => String }, tax_value: { required: false, type: () => String }, fee_percent: { required: false, type: () => String }, fee_value: { required: false, type: () => String }, id_automated_point: { required: false, type: () => String } };
    }
}
exports.UpdateTaxFeeDto = UpdateTaxFeeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTaxFeeDto.prototype, "guid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTaxFeeDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTaxFeeDto.prototype, "tax_percent", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTaxFeeDto.prototype, "tax_value", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTaxFeeDto.prototype, "fee_percent", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTaxFeeDto.prototype, "fee_value", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTaxFeeDto.prototype, "id_automated_point", void 0);
class CreateDiscountDto {
    guid;
    name;
    discount_percent;
    discount_value;
    id_automated_point;
    static _OPENAPI_METADATA_FACTORY() {
        return { guid: { required: false, type: () => String }, name: { required: true, type: () => String }, discount_percent: { required: false, type: () => String }, discount_value: { required: false, type: () => String }, id_automated_point: { required: false, type: () => String } };
    }
}
exports.CreateDiscountDto = CreateDiscountDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDiscountDto.prototype, "guid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDiscountDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDiscountDto.prototype, "discount_percent", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDiscountDto.prototype, "discount_value", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDiscountDto.prototype, "id_automated_point", void 0);
class UpdateDiscountDto {
    guid;
    name;
    discount_percent;
    discount_value;
    id_automated_point;
    static _OPENAPI_METADATA_FACTORY() {
        return { guid: { required: false, type: () => String }, name: { required: false, type: () => String }, discount_percent: { required: false, type: () => String }, discount_value: { required: false, type: () => String }, id_automated_point: { required: false, type: () => String } };
    }
}
exports.UpdateDiscountDto = UpdateDiscountDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDiscountDto.prototype, "guid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDiscountDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDiscountDto.prototype, "discount_percent", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDiscountDto.prototype, "discount_value", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDiscountDto.prototype, "id_automated_point", void 0);
//# sourceMappingURL=finance.dto.js.map