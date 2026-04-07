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
exports.QueryService = void 0;
const common_1 = require("@nestjs/common");
const tenant_service_1 = require("../tenant.service");
function serializeBigInt(value) {
    if (typeof value === 'bigint') {
        return Number(value);
    }
    if (Array.isArray(value)) {
        return value.map(serializeBigInt);
    }
    if (value !== null && typeof value === 'object') {
        return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, serializeBigInt(v)]));
    }
    return value;
}
let QueryService = class QueryService {
    tenantService;
    constructor(tenantService) {
        this.tenantService = tenantService;
    }
    async executeQuery(dbName, sql) {
        const normalized = sql.trim().toLowerCase();
        if (!normalized.startsWith('select')) {
            throw new common_1.BadRequestException('Only SELECT statements are allowed.');
        }
        const blockedKeywords = [
            'insert',
            'update',
            'delete',
            'drop',
            'truncate',
            'alter',
            'create',
            'grant',
            'revoke',
            'exec',
            'execute',
            'pg_',
            'information_schema',
        ];
        for (const keyword of blockedKeywords) {
            const pattern = new RegExp(`\\b${keyword.replace('_', '_')}\\b`, 'i');
            if (pattern.test(normalized)) {
                throw new common_1.BadRequestException(`Blocked keyword detected: "${keyword}". Only simple SELECT queries are allowed.`);
            }
        }
        const client = await this.tenantService.getClient(dbName);
        try {
            const result = await client.$queryRawUnsafe(sql);
            return serializeBigInt(result);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Query failed: ${error.message}`);
        }
    }
};
exports.QueryService = QueryService;
exports.QueryService = QueryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_service_1.TenantService])
], QueryService);
//# sourceMappingURL=query.service.js.map