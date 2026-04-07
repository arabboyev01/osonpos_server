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
exports.FinanceController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const finance_service_1 = require("../services/finance.service");
const finance_dto_1 = require("../dto/finance.dto");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const roles_guard_1 = require("../../auth/roles.guard");
const roles_decorator_1 = require("../../auth/roles.decorator");
let FinanceController = class FinanceController {
    financeService;
    constructor(financeService) {
        this.financeService = financeService;
    }
    createTaxFee(req, dto) {
        return this.financeService.createTaxFee(req.user.dbName, req.user.id, dto);
    }
    findAllTaxFees(req) {
        return this.financeService.findAllTaxFees(req.user.dbName, req.user.workplaceId);
    }
    updateTaxFee(req, id, dto) {
        return this.financeService.updateTaxFee(req.user.dbName, req.user.id, id, dto);
    }
    removeTaxFee(req, id) {
        return this.financeService.removeTaxFee(req.user.dbName, id);
    }
    createDiscount(req, dto) {
        return this.financeService.createDiscount(req.user.dbName, req.user.id, dto);
    }
    findAllDiscounts(req) {
        return this.financeService.findAllDiscounts(req.user.dbName, req.user.workplaceId);
    }
    updateDiscount(req, id, dto) {
        return this.financeService.updateDiscount(req.user.dbName, req.user.id, id, dto);
    }
    removeDiscount(req, id) {
        return this.financeService.removeDiscount(req.user.dbName, id);
    }
};
exports.FinanceController = FinanceController;
__decorate([
    (0, common_1.Post)('taxes/create'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, finance_dto_1.CreateTaxFeeDto]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "createTaxFee", null);
__decorate([
    (0, common_1.Get)('taxes/all'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "findAllTaxFees", null);
__decorate([
    (0, common_1.Patch)('taxes/update/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, finance_dto_1.UpdateTaxFeeDto]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "updateTaxFee", null);
__decorate([
    (0, common_1.Delete)('taxes/delete/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "removeTaxFee", null);
__decorate([
    (0, common_1.Post)('discounts/create'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, finance_dto_1.CreateDiscountDto]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "createDiscount", null);
__decorate([
    (0, common_1.Get)('discounts/all'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "findAllDiscounts", null);
__decorate([
    (0, common_1.Patch)('discounts/update/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, finance_dto_1.UpdateDiscountDto]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "updateDiscount", null);
__decorate([
    (0, common_1.Delete)('discounts/delete/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "removeDiscount", null);
exports.FinanceController = FinanceController = __decorate([
    (0, common_1.Controller)('finance'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('OWNER', 'ADMIN', 'EMPLOYEE'),
    __metadata("design:paramtypes", [finance_service_1.FinanceService])
], FinanceController);
//# sourceMappingURL=finance.controller.js.map