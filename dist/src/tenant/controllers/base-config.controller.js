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
exports.BaseConfigController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const base_config_service_1 = require("../services/base-config.service");
const base_config_dto_1 = require("../dto/base-config.dto");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const roles_guard_1 = require("../../auth/roles.guard");
const roles_decorator_1 = require("../../auth/roles.decorator");
let BaseConfigController = class BaseConfigController {
    baseConfigService;
    constructor(baseConfigService) {
        this.baseConfigService = baseConfigService;
    }
    create(req, dto) {
        return this.baseConfigService.create(req.user.dbName, dto);
    }
    findAll(req) {
        return this.baseConfigService.findAll(req.user.dbName);
    }
    findByKey(req, key) {
        return this.baseConfigService.findByKey(req.user.dbName, key);
    }
    findOne(req, id) {
        return this.baseConfigService.findOne(req.user.dbName, id);
    }
    update(req, id, dto) {
        return this.baseConfigService.update(req.user.dbName, id, dto);
    }
    remove(req, id) {
        return this.baseConfigService.remove(req.user.dbName, id);
    }
};
exports.BaseConfigController = BaseConfigController;
__decorate([
    (0, common_1.Post)('create'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, base_config_dto_1.CreateBaseConfigDto]),
    __metadata("design:returntype", void 0)
], BaseConfigController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BaseConfigController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('key/:key'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BaseConfigController.prototype, "findByKey", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BaseConfigController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, base_config_dto_1.UpdateBaseConfigDto]),
    __metadata("design:returntype", void 0)
], BaseConfigController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BaseConfigController.prototype, "remove", null);
exports.BaseConfigController = BaseConfigController = __decorate([
    (0, common_1.Controller)('base-config'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('OWNER', 'ADMIN', 'EMPLOYEE'),
    __metadata("design:paramtypes", [base_config_service_1.BaseConfigService])
], BaseConfigController);
//# sourceMappingURL=base-config.controller.js.map