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
exports.SettlmentService = void 0;
const common_1 = require("@nestjs/common");
const tenant_service_1 = require("../tenant.service");
const log_service_1 = require("./log.service");
let SettlmentService = class SettlmentService {
    tenantService;
    logService;
    constructor(tenantService, logService) {
        this.tenantService = tenantService;
        this.logService = logService;
    }
    async create(dbName, userId, dto) {
        const db = await this.tenantService.getClient(dbName);
        const settlement = await db.s_Settlments.create({
            data: {
                ...dto,
                dt_closed: dto.dt_closed ? new Date(dto.dt_closed) : null,
            },
        });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'CREATE_SETTLEMENT', settlement);
        return settlement;
    }
    async findAll(dbName) {
        const db = await this.tenantService.getClient(dbName);
        return db.s_Settlments.findMany({
            where: { is_deleted: false },
            orderBy: { dt_created: 'desc' },
        });
    }
    async findOne(dbName, id) {
        const db = await this.tenantService.getClient(dbName);
        const result = await db.s_Settlments.findFirst({
            where: { id, is_deleted: false },
        });
        if (!result) {
            throw new common_1.NotFoundException(`Settlement with ID ${id} not found`);
        }
        return result;
    }
    async findLatest(dbName) {
        const db = await this.tenantService.getClient(dbName);
        const result = await db.s_Settlments.findFirst({
            where: {
                is_deleted: false,
            },
            orderBy: {
                dt_created: 'desc',
            },
        });
        return result;
    }
    async update(dbName, userId, id, dto) {
        const db = await this.tenantService.getClient(dbName);
        await this.findOne(dbName, id);
        const updatedSettlement = await db.s_Settlments.update({
            where: { id },
            data: {
                ...dto,
                dt_closed: dto.dt_closed ? new Date(dto.dt_closed) : undefined,
            },
        });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'UPDATE_SETTLEMENT', updatedSettlement);
        return updatedSettlement;
    }
    async remove(dbName, id) {
        const db = await this.tenantService.getClient(dbName);
        await this.findOne(dbName, id);
        return db.s_Settlments.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
};
exports.SettlmentService = SettlmentService;
exports.SettlmentService = SettlmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_service_1.TenantService,
        log_service_1.LogService])
], SettlmentService);
//# sourceMappingURL=settlment.service.js.map