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
exports.UpdatePaymentDeviceDto = exports.CreatePaymentDeviceDto = exports.UpdatePrinterDto = exports.CreatePrinterDto = exports.UpdateWorkplaceDto = exports.CreateWorkplaceDto = exports.UpdateAutomatedPointDto = exports.CreateAutomatedPointDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAutomatedPointDto {
    name;
    guid;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, guid: { required: false, type: () => String } };
    }
}
exports.CreateAutomatedPointDto = CreateAutomatedPointDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAutomatedPointDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAutomatedPointDto.prototype, "guid", void 0);
class UpdateAutomatedPointDto {
    name;
    guid;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, guid: { required: false, type: () => String } };
    }
}
exports.UpdateAutomatedPointDto = UpdateAutomatedPointDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAutomatedPointDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAutomatedPointDto.prototype, "guid", void 0);
class CreateWorkplaceDto {
    name;
    guid;
    automated_point_id;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, guid: { required: false, type: () => String }, automated_point_id: { required: true, type: () => String } };
    }
}
exports.CreateWorkplaceDto = CreateWorkplaceDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWorkplaceDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateWorkplaceDto.prototype, "guid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWorkplaceDto.prototype, "automated_point_id", void 0);
class UpdateWorkplaceDto {
    name;
    guid;
    automated_point_id;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, guid: { required: false, type: () => String }, automated_point_id: { required: false, type: () => String } };
    }
}
exports.UpdateWorkplaceDto = UpdateWorkplaceDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWorkplaceDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWorkplaceDto.prototype, "guid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWorkplaceDto.prototype, "automated_point_id", void 0);
class CreatePrinterDto {
    name;
    guid;
    ip_address;
    port;
    provider;
    mac_address;
    type;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, guid: { required: false, type: () => String }, ip_address: { required: false, type: () => String }, port: { required: false, type: () => String }, provider: { required: false, type: () => String }, mac_address: { required: false, type: () => String }, type: { required: false, type: () => String } };
    }
}
exports.CreatePrinterDto = CreatePrinterDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePrinterDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePrinterDto.prototype, "guid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePrinterDto.prototype, "ip_address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePrinterDto.prototype, "port", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePrinterDto.prototype, "provider", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePrinterDto.prototype, "mac_address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePrinterDto.prototype, "type", void 0);
class UpdatePrinterDto {
    name;
    guid;
    ip_address;
    port;
    provider;
    mac_address;
    type;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, guid: { required: false, type: () => String }, ip_address: { required: false, type: () => String }, port: { required: false, type: () => String }, provider: { required: false, type: () => String }, mac_address: { required: false, type: () => String }, type: { required: false, type: () => String } };
    }
}
exports.UpdatePrinterDto = UpdatePrinterDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePrinterDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePrinterDto.prototype, "guid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePrinterDto.prototype, "ip_address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePrinterDto.prototype, "port", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePrinterDto.prototype, "provider", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePrinterDto.prototype, "mac_address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePrinterDto.prototype, "type", void 0);
class CreatePaymentDeviceDto {
    name;
    guid;
    ip_address;
    port;
    provider;
    mac_address;
    type;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, guid: { required: false, type: () => String }, ip_address: { required: false, type: () => String }, port: { required: false, type: () => String }, provider: { required: false, type: () => String }, mac_address: { required: false, type: () => String }, type: { required: false, type: () => String } };
    }
}
exports.CreatePaymentDeviceDto = CreatePaymentDeviceDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePaymentDeviceDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePaymentDeviceDto.prototype, "guid", void 0);
__decorate([
    (0, class_validator_1.IsIP)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePaymentDeviceDto.prototype, "ip_address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePaymentDeviceDto.prototype, "port", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePaymentDeviceDto.prototype, "provider", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePaymentDeviceDto.prototype, "mac_address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePaymentDeviceDto.prototype, "type", void 0);
class UpdatePaymentDeviceDto {
    name;
    guid;
    ip_address;
    port;
    provider;
    mac_address;
    type;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, guid: { required: false, type: () => String }, ip_address: { required: false, type: () => String }, port: { required: false, type: () => String }, provider: { required: false, type: () => String }, mac_address: { required: false, type: () => String }, type: { required: false, type: () => String } };
    }
}
exports.UpdatePaymentDeviceDto = UpdatePaymentDeviceDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePaymentDeviceDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePaymentDeviceDto.prototype, "guid", void 0);
__decorate([
    (0, class_validator_1.IsIP)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePaymentDeviceDto.prototype, "ip_address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePaymentDeviceDto.prototype, "port", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePaymentDeviceDto.prototype, "provider", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePaymentDeviceDto.prototype, "mac_address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePaymentDeviceDto.prototype, "type", void 0);
//# sourceMappingURL=business.dto.js.map