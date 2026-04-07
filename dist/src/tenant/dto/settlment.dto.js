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
exports.UpdateSettlmentDto = exports.CreateSettlmentDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateSettlmentDto {
    name;
    is_closed;
    dt_closed;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, is_closed: { required: false, type: () => Boolean }, dt_closed: { required: false, type: () => String } };
    }
}
exports.CreateSettlmentDto = CreateSettlmentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSettlmentDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateSettlmentDto.prototype, "is_closed", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSettlmentDto.prototype, "dt_closed", void 0);
class UpdateSettlmentDto {
    name;
    is_closed;
    dt_closed;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, is_closed: { required: false, type: () => Boolean }, dt_closed: { required: false, type: () => String } };
    }
}
exports.UpdateSettlmentDto = UpdateSettlmentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSettlmentDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateSettlmentDto.prototype, "is_closed", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSettlmentDto.prototype, "dt_closed", void 0);
//# sourceMappingURL=settlment.dto.js.map