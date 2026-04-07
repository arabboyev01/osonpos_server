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
exports.EmployeeRoleService = void 0;
const common_1 = require("@nestjs/common");
const tenant_service_1 = require("../tenant.service");
let EmployeeRoleService = class EmployeeRoleService {
    tenantService;
    constructor(tenantService) {
        this.tenantService = tenantService;
    }
    async create(dbName, dto) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Employee_Role.create({
            data: dto,
        });
    }
    async findAll(dbName) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Employee_Role.findMany({
            where: { is_deleted: false },
        });
    }
    async findOne(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        const role = await client.s_Employee_Role.findFirst({
            where: { id, is_deleted: false },
        });
        if (!role)
            throw new common_1.NotFoundException('Role not found');
        return role;
    }
    async update(dbName, id, dto) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Employee_Role.update({
            where: { id },
            data: dto,
        });
    }
    async remove(dbName, id) {
        const client = await this.tenantService.getClient(dbName);
        return client.s_Employee_Role.update({
            where: { id },
            data: { is_deleted: true },
        });
    }
};
exports.EmployeeRoleService = EmployeeRoleService;
exports.EmployeeRoleService = EmployeeRoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_service_1.TenantService])
], EmployeeRoleService);
//# sourceMappingURL=employee-role.service.js.map