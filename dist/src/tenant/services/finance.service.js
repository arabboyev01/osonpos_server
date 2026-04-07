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
exports.FinanceService = void 0;
const common_1 = require("@nestjs/common");
const tenant_service_1 = require("../tenant.service");
const log_service_1 = require("./log.service");
let FinanceService = class FinanceService {
    tenantService;
    logService;
    constructor(tenantService, logService) {
        this.tenantService = tenantService;
        this.logService = logService;
    }
    async createTaxFee(dbName, userId, dto) {
        const client = await this.tenantService.getClient(dbName);
        const taxFee = await client.s_Tax_Fee.create({ data: dto });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'CREATE_TAX_FEE', taxFee);
        return taxFee;
    }
    async findAllTaxFees(dbName, workplaceId) {
        const client = await this.tenantService.getClient(dbName);
        let idAutomatedPoint = null;
        if (workplaceId) {
            const workplace = await client.a_Workplace.findFirst({
                where: { id: workplaceId, is_deleted: false },
            });
            if (workplace) {
                idAutomatedPoint = workplace.automated_point_id;
            }
        }
        const where = { is_deleted: false };
        if (idAutomatedPoint) {
            where.OR = [
                { id_automated_point: idAutomatedPoint },
                { id_automated_point: '0' },
                { id_automated_point: null },
            ];
        }
        return client.s_Tax_Fee.findMany({ where });
    }
    async findOneTaxFee(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Tax_Fee.findFirst({ where: { id, is_deleted: false } });
    }
    async updateTaxFee(dbName, userId, id, dto) {
        const client = await this.tenantService.getClient(dbName);
        const taxFee = await client.s_Tax_Fee.update({ where: { id }, data: dto });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'UPDATE_TAX_FEE', taxFee);
        return taxFee;
    }
    async removeTaxFee(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Tax_Fee.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
    async createDiscount(dbName, userId, dto) {
        const client = await this.tenantService.getClient(dbName);
        const discount = await client.s_Discount.create({ data: dto });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'CREATE_DISCOUNT', discount);
        return discount;
    }
    async findAllDiscounts(dbName, workplaceId) {
        const client = await this.tenantService.getClient(dbName);
        let idAutomatedPoint = null;
        if (workplaceId) {
            const workplace = await client.a_Workplace.findFirst({
                where: { id: workplaceId, is_deleted: false },
            });
            if (workplace) {
                idAutomatedPoint = workplace.automated_point_id;
            }
        }
        const where = { is_deleted: false };
        if (idAutomatedPoint) {
            where.OR = [
                { id_automated_point: idAutomatedPoint },
                { id_automated_point: '0' },
                { id_automated_point: null },
            ];
        }
        return client.s_Discount.findMany({ where });
    }
    async findOneDiscount(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Discount.findFirst({ where: { id, is_deleted: false } });
    }
    async updateDiscount(dbName, userId, id, dto) {
        const client = await this.tenantService.getClient(dbName);
        const discount = await client.s_Discount.update({
            where: { id },
            data: dto,
        });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'UPDATE_DISCOUNT', discount);
        return discount;
    }
    async removeDiscount(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Discount.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
};
exports.FinanceService = FinanceService;
exports.FinanceService = FinanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_service_1.TenantService,
        log_service_1.LogService])
], FinanceService);
//# sourceMappingURL=finance.service.js.map