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
exports.ReceiptController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const inventarization_service_1 = require("../services/inventarization.service");
const inventarization_dto_1 = require("../dto/inventarization.dto");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const roles_guard_1 = require("../../auth/roles.guard");
const roles_decorator_1 = require("../../auth/roles.decorator");
let ReceiptController = class ReceiptController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(req, dto) {
        return this.service.createReceipt(req.user.dbName, req.user.id, dto);
    }
    findAll(req) {
        return this.service.findAllReceipts(req.user.dbName);
    }
    findOne(req, id) {
        return this.service.findOneReceipt(req.user.dbName, id);
    }
    update(req, id, dto) {
        return this.service.updateReceipt(req.user.dbName, req.user.id, id, dto);
    }
    remove(req, id) {
        return this.service.removeReceipt(req.user.dbName, id);
    }
};
exports.ReceiptController = ReceiptController;
__decorate([
    (0, common_1.Post)('create'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, inventarization_dto_1.CreateReceiptDto]),
    __metadata("design:returntype", void 0)
], ReceiptController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReceiptController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ReceiptController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, inventarization_dto_1.UpdateReceiptDto]),
    __metadata("design:returntype", void 0)
], ReceiptController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ReceiptController.prototype, "remove", null);
exports.ReceiptController = ReceiptController = __decorate([
    (0, common_1.Controller)('receipt'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('OWNER', 'ADMIN', 'EMPLOYEE'),
    __metadata("design:paramtypes", [inventarization_service_1.InventarizationService])
], ReceiptController);
//# sourceMappingURL=receipt.controller.js.map