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
exports.BusinessService = void 0;
const common_1 = require("@nestjs/common");
const tenant_service_1 = require("../tenant.service");
let BusinessService = class BusinessService {
    tenantService;
    constructor(tenantService) {
        this.tenantService = tenantService;
    }
    async createPoint(dbName, dto) {
        const client = await this.tenantService.getClient(dbName);
        return client.a_Automated_Point.create({ data: dto });
    }
    async findAllPoints(dbName) {
        const client = await this.tenantService.getClient(dbName);
        return client.a_Automated_Point.findMany({ where: { is_deleted: false } });
    }
    async findOnePoint(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.a_Automated_Point.findFirst({
            where: { id, is_deleted: false },
        });
    }
    async updatePoint(dbName, id, dto) {
        const client = await this.tenantService.getClient(dbName);
        return client.a_Automated_Point.update({ where: { id }, data: dto });
    }
    async removePoint(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.a_Automated_Point.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
    async createWorkplace(dbName, dto) {
        const client = await this.tenantService.getClient(dbName);
        return client.a_Workplace.create({ data: dto });
    }
    async findAllWorkplaces(dbName) {
        const client = await this.tenantService.getClient(dbName);
        return client.a_Workplace.findMany({ where: { is_deleted: false } });
    }
    async findOneWorkplace(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.a_Workplace.findFirst({ where: { id, is_deleted: false } });
    }
    async updateWorkplace(dbName, id, dto) {
        const client = await this.tenantService.getClient(dbName);
        return client.a_Workplace.update({ where: { id }, data: dto });
    }
    async removeWorkplace(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.a_Workplace.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
    async createPrinter(dbName, dto) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Printer.create({ data: dto });
    }
    async findAllPrinters(dbName) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Printer.findMany({ where: { is_deleted: false } });
    }
    async findOnePrinter(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Printer.findFirst({ where: { id, is_deleted: false } });
    }
    async updatePrinter(dbName, id, dto) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Printer.update({ where: { id }, data: dto });
    }
    async removePrinter(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Printer.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
    async createPaymentDevice(dbName, dto) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Payment_Devices.create({ data: dto });
    }
    async findAllPaymentDevices(dbName) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Payment_Devices.findMany({ where: { is_deleted: false } });
    }
    async findOnePaymentDevice(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Payment_Devices.findFirst({
            where: { id, is_deleted: false },
        });
    }
    async updatePaymentDevice(dbName, id, dto) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Payment_Devices.update({ where: { id }, data: dto });
    }
    async removePaymentDevice(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Payment_Devices.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
};
exports.BusinessService = BusinessService;
exports.BusinessService = BusinessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_service_1.TenantService])
], BusinessService);
//# sourceMappingURL=business.service.js.map