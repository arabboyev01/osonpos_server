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
exports.LogService = void 0;
const common_1 = require("@nestjs/common");
const tenant_service_1 = require("../tenant.service");
let LogService = class LogService {
    tenantService;
    constructor(tenantService) {
        this.tenantService = tenantService;
    }
    async create(dbName, dto) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Logs.create({ data: dto });
    }
    async recordLog(dbName, userId, type, action, details) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Logs.create({
            data: {
                user_id: userId,
                type: type,
                action,
                details: JSON.stringify(details),
            },
        });
    }
    async findAll(dbName, query) {
        const client = await this.tenantService.getClient(dbName);
        const { user_id, type, action, from_date, to_date, limit, offset } = query || {};
        const where = { is_deleted: false };
        if (user_id)
            where.user_id = user_id;
        if (type)
            where.type = type;
        if (action) {
            where.action = { contains: action, mode: 'insensitive' };
        }
        if (from_date || to_date) {
            where.dt_created = {};
            if (from_date)
                where.dt_created.gte = new Date(from_date);
            if (to_date)
                where.dt_created.lte = new Date(to_date);
        }
        return client.s_Logs.findMany({
            where,
            orderBy: { dt_created: 'desc' },
            take: limit ? parseInt(limit) : 100,
            skip: offset ? parseInt(offset) : 0,
        });
    }
};
exports.LogService = LogService;
exports.LogService = LogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_service_1.TenantService])
], LogService);
//# sourceMappingURL=log.service.js.map