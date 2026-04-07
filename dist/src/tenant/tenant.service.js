"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
let TenantService = class TenantService {
    clients = new Map();
    pools = new Map();
    async getClient(dbName) {
        if (!dbName || dbName === 'undefined') {
            throw new Error('Tenant database name is missing or invalid ("undefined"). Please ensure you are logged in correctly.');
        }
        if (this.clients.has(dbName)) {
            return this.clients.get(dbName);
        }
        const baseUrl = process.env.DATABASE_URL;
        if (!baseUrl)
            throw new Error('DATABASE_URL not found');
        const url = new URL(baseUrl);
        url.pathname = `/${dbName}`;
        const pool = new pg_1.Pool({ connectionString: url.toString() });
        const adapter = new adapter_pg_1.PrismaPg(pool);
        const client = new client_1.PrismaClient({ adapter });
        await client.$connect();
        this.clients.set(dbName, client);
        this.pools.set(dbName, pool);
        return client;
    }
    async onModuleDestroy() {
        for (const client of this.clients.values()) {
            await client.$disconnect();
        }
        for (const pool of this.pools.values()) {
            await pool.end();
        }
    }
    async getAutomatedPointId(client, workplaceId) {
        if (!workplaceId)
            return null;
        const workplace = await client.a_Workplace.findFirst({
            where: { id: workplaceId, is_deleted: false },
        });
        return workplace ? workplace.automated_point_id : null;
    }
};
exports.TenantService = TenantService;
exports.TenantService = TenantService = __decorate([
    (0, common_1.Injectable)()
], TenantService);
//# sourceMappingURL=tenant.service.js.map