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
exports.MeasurementController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const measurement_service_1 = require("../services/measurement.service");
const measurement_dto_1 = require("../dto/measurement.dto");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const roles_guard_1 = require("../../auth/roles.guard");
const roles_decorator_1 = require("../../auth/roles.decorator");
let MeasurementController = class MeasurementController {
    measurementService;
    constructor(measurementService) {
        this.measurementService = measurementService;
    }
    createMeasurement(req, dto) {
        return this.measurementService.createMeasurement(req.user.dbName, dto);
    }
    findAllMeasurements(req) {
        return this.measurementService.findAllMeasurements(req.user.dbName);
    }
    updateMeasurement(req, id, dto) {
        return this.measurementService.updateMeasurement(req.user.dbName, id, dto);
    }
    removeMeasurement(req, id) {
        return this.measurementService.removeMeasurement(req.user.dbName, id);
    }
};
exports.MeasurementController = MeasurementController;
__decorate([
    (0, common_1.Post)('create'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, measurement_dto_1.CreateMeasurementDto]),
    __metadata("design:returntype", void 0)
], MeasurementController.prototype, "createMeasurement", null);
__decorate([
    (0, common_1.Get)('all'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MeasurementController.prototype, "findAllMeasurements", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, measurement_dto_1.UpdateMeasurementDto]),
    __metadata("design:returntype", void 0)
], MeasurementController.prototype, "updateMeasurement", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], MeasurementController.prototype, "removeMeasurement", null);
exports.MeasurementController = MeasurementController = __decorate([
    (0, common_1.Controller)('measurements'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('OWNER', 'ADMIN', 'EMPLOYEE'),
    __metadata("design:paramtypes", [measurement_service_1.MeasurementService])
], MeasurementController);
//# sourceMappingURL=measurement.controller.js.map