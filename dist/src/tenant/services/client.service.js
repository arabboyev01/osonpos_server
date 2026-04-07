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
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const tenant_service_1 = require("../tenant.service");
const log_service_1 = require("./log.service");
let ClientService = class ClientService {
    tenantService;
    logService;
    constructor(tenantService, logService) {
        this.tenantService = tenantService;
        this.logService = logService;
    }
    async create(dbName, userId, dto) {
        const client = await this.tenantService.getClient(dbName);
        const data = {
            ...dto,
            birthday: this.transformDate(dto.birthday),
        };
        const newClient = await client.s_Clients.create({
            data,
        });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'CREATE_CLIENT', newClient);
        return newClient;
    }
    async findAll(dbName) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Clients.findMany({
            where: { is_deleted: false },
            orderBy: { dt_created: 'desc' },
        });
    }
    async findOne(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        const result = await client.s_Clients.findFirst({
            where: { id, is_deleted: false },
        });
        if (!result) {
            throw new common_1.NotFoundException(`Client with ID ${id} not found`);
        }
        return result;
    }
    async update(dbName, userId, id, dto) {
        const client = await this.tenantService.getClient(dbName);
        await this.findOne(dbName, id);
        const data = {
            ...dto,
            birthday: this.transformDate(dto.birthday),
        };
        const updatedClient = await client.s_Clients.update({
            where: { id },
            data,
        });
        await this.logService.recordLog(dbName, userId, 'SYSTEM', 'UPDATE_CLIENT', updatedClient);
        return updatedClient;
    }
    transformDate(dateStr) {
        if (!dateStr || dateStr.trim() === '')
            return undefined;
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? undefined : date;
    }
    async remove(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        await this.findOne(dbName, id);
        return client.s_Clients.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_service_1.TenantService,
        log_service_1.LogService])
], ClientService);
//# sourceMappingURL=client.service.js.map