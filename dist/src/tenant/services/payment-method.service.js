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
exports.PaymentMethodService = void 0;
const common_1 = require("@nestjs/common");
const tenant_service_1 = require("../tenant.service");
const log_service_1 = require("./log.service");
let PaymentMethodService = class PaymentMethodService {
    tenantService;
    logService;
    constructor(tenantService, logService) {
        this.tenantService = tenantService;
        this.logService = logService;
    }
    async create(dbName, userId, dto) {
        const client = await this.tenantService.getClient(dbName);
        const paymentMethod = await client.s_Payment_Method.create({ data: dto });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'CREATE_PAYMENT_METHOD', paymentMethod);
        return paymentMethod;
    }
    async seedDefaults(dbName) {
        const client = await this.tenantService.getClient(dbName);
        const existingCash = await client.s_Payment_Method.findFirst({
            where: { name: 'Cash', is_deleted: false },
        });
        if (!existingCash) {
            await client.s_Payment_Method.create({
                data: { name: 'Cash' },
            });
        }
    }
    async findAll(dbName) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Payment_Method.findMany({ where: { is_deleted: false } });
    }
    async findOne(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Payment_Method.findFirst({
            where: { id, is_deleted: false },
        });
    }
    async update(dbName, userId, id, dto) {
        const client = await this.tenantService.getClient(dbName);
        const paymentMethod = await client.s_Payment_Method.update({
            where: { id },
            data: dto,
        });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'UPDATE_PAYMENT_METHOD', paymentMethod);
        return paymentMethod;
    }
    async remove(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Payment_Method.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
};
exports.PaymentMethodService = PaymentMethodService;
exports.PaymentMethodService = PaymentMethodService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_service_1.TenantService,
        log_service_1.LogService])
], PaymentMethodService);
//# sourceMappingURL=payment-method.service.js.map