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
exports.BusinessController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const business_service_1 = require("../services/business.service");
const business_dto_1 = require("../dto/business.dto");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const roles_guard_1 = require("../../auth/roles.guard");
const roles_decorator_1 = require("../../auth/roles.decorator");
let BusinessController = class BusinessController {
    businessService;
    constructor(businessService) {
        this.businessService = businessService;
    }
    createPoint(req, dto) {
        return this.businessService.createPoint(req.user.dbName, dto);
    }
    findAllPoints(req) {
        return this.businessService.findAllPoints(req.user.dbName);
    }
    updatePoint(req, id, dto) {
        return this.businessService.updatePoint(req.user.dbName, id, dto);
    }
    removePoint(req, id) {
        return this.businessService.removePoint(req.user.dbName, id);
    }
    createWorkplace(req, dto) {
        return this.businessService.createWorkplace(req.user.dbName, dto);
    }
    findAllWorkplaces(req) {
        return this.businessService.findAllWorkplaces(req.user.dbName);
    }
    updateWorkplace(req, id, dto) {
        return this.businessService.updateWorkplace(req.user.dbName, id, dto);
    }
    removeWorkplace(req, id) {
        return this.businessService.removeWorkplace(req.user.dbName, id);
    }
    createPrinter(req, dto) {
        return this.businessService.createPrinter(req.user.dbName, dto);
    }
    findAllPrinters(req) {
        return this.businessService.findAllPrinters(req.user.dbName);
    }
    updatePrinter(req, id, dto) {
        return this.businessService.updatePrinter(req.user.dbName, id, dto);
    }
    removePrinter(req, id) {
        return this.businessService.removePrinter(req.user.dbName, id);
    }
    createPaymentDevice(req, dto) {
        return this.businessService.createPaymentDevice(req.user.dbName, dto);
    }
    findAllPaymentDevices(req) {
        return this.businessService.findAllPaymentDevices(req.user.dbName);
    }
    updatePaymentDevice(req, id, dto) {
        return this.businessService.updatePaymentDevice(req.user.dbName, id, dto);
    }
    removePaymentDevice(req, id) {
        return this.businessService.removePaymentDevice(req.user.dbName, id);
    }
};
exports.BusinessController = BusinessController;
__decorate([
    (0, common_1.Post)('points/create'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, business_dto_1.CreateAutomatedPointDto]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "createPoint", null);
__decorate([
    (0, common_1.Get)('points/all'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "findAllPoints", null);
__decorate([
    (0, common_1.Patch)('points/update/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, business_dto_1.UpdateAutomatedPointDto]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "updatePoint", null);
__decorate([
    (0, common_1.Delete)('points/delete/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "removePoint", null);
__decorate([
    (0, common_1.Post)('workplaces/create'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, business_dto_1.CreateWorkplaceDto]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "createWorkplace", null);
__decorate([
    (0, common_1.Get)('workplaces/all'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "findAllWorkplaces", null);
__decorate([
    (0, common_1.Patch)('workplaces/update/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, business_dto_1.UpdateWorkplaceDto]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "updateWorkplace", null);
__decorate([
    (0, common_1.Delete)('workplaces/delete/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "removeWorkplace", null);
__decorate([
    (0, common_1.Post)('printers/create'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, business_dto_1.CreatePrinterDto]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "createPrinter", null);
__decorate([
    (0, common_1.Get)('printers/all'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "findAllPrinters", null);
__decorate([
    (0, common_1.Patch)('printers/update/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, business_dto_1.UpdatePrinterDto]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "updatePrinter", null);
__decorate([
    (0, common_1.Delete)('printers/delete/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "removePrinter", null);
__decorate([
    (0, common_1.Post)('payment-devices/create'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, business_dto_1.CreatePaymentDeviceDto]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "createPaymentDevice", null);
__decorate([
    (0, common_1.Get)('payment-devices/all'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "findAllPaymentDevices", null);
__decorate([
    (0, common_1.Patch)('payment-devices/update/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, business_dto_1.UpdatePaymentDeviceDto]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "updatePaymentDevice", null);
__decorate([
    (0, common_1.Delete)('payment-devices/delete/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BusinessController.prototype, "removePaymentDevice", null);
exports.BusinessController = BusinessController = __decorate([
    (0, common_1.Controller)('business-config'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('OWNER', 'ADMIN', 'EMPLOYEE'),
    __metadata("design:paramtypes", [business_service_1.BusinessService])
], BusinessController);
//# sourceMappingURL=business.controller.js.map