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
exports.QueryLogDto = exports.CreateLogDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateLogDto {
    user_id;
    type;
    action;
    details;
    static _OPENAPI_METADATA_FACTORY() {
        return { user_id: { required: false, type: () => String }, type: { required: true, type: () => Object }, action: { required: true, type: () => String }, details: { required: false, type: () => String } };
    }
}
exports.CreateLogDto = CreateLogDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLogDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.S_Logs_Type),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLogDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLogDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLogDto.prototype, "details", void 0);
class QueryLogDto {
    user_id;
    type;
    action;
    from_date;
    to_date;
    limit;
    offset;
    static _OPENAPI_METADATA_FACTORY() {
        return { user_id: { required: false, type: () => String }, type: { required: false, type: () => Object }, action: { required: false, type: () => String }, from_date: { required: false, type: () => String }, to_date: { required: false, type: () => String }, limit: { required: false, type: () => String }, offset: { required: false, type: () => String } };
    }
}
exports.QueryLogDto = QueryLogDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryLogDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.S_Logs_Type),
    __metadata("design:type", String)
], QueryLogDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryLogDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryLogDto.prototype, "from_date", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryLogDto.prototype, "to_date", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryLogDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryLogDto.prototype, "offset", void 0);
//# sourceMappingURL=log.dto.js.map