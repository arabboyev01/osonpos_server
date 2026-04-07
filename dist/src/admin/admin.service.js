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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let AdminService = class AdminService {
    prisma;
    configService;
    jwtService;
    constructor(prisma, configService, jwtService) {
        this.prisma = prisma;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async login(dto) {
        const adminLogin = this.configService.get('ADMIN_LOGIN');
        const adminPass = this.configService.get('ADMIN_PASSWORD');
        if (dto.login !== adminLogin || dto.password !== adminPass) {
            throw new common_1.UnauthorizedException('Admin login failed');
        }
        return {
            message: 'Admin login successful',
            access_token: this.jwtService.sign({
                sub: 'static_admin_id',
                login: adminLogin,
                role: 'SUPERADMIN',
            }),
        };
    }
    async getBusinessesWithOwners() {
        const businesses = await this.prisma.a_Business.findMany({
            where: { is_deleted: false },
            orderBy: { dt_created: 'desc' },
        });
        const businessIds = businesses.map((b) => b.id);
        const users = await this.prisma.a_User.findMany({
            where: {
                business_id: { in: businessIds },
                is_deleted: false,
            },
        });
        return businesses.map((business) => {
            const businessOwner = users.find((user) => user.business_id === business.id);
            return {
                ...business,
                owner: businessOwner ? {
                    id: businessOwner.id,
                    login: businessOwner.login,
                    full_name: businessOwner.full_name,
                    role: businessOwner.role,
                    public_name: businessOwner.public_name,
                    email: businessOwner.details,
                    dt_created: businessOwner.dt_created,
                } : null,
            };
        });
    }
    async getAllRegisteredUsers() {
        return this.prisma.a_User.findMany({
            where: { is_deleted: false },
            select: {
                id: true,
                login: true,
                full_name: true,
                role: true,
                business_id: true,
                time_zone: true,
                public_name: true,
                language: true,
                dt_created: true,
            },
        });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        jwt_1.JwtService])
], AdminService);
//# sourceMappingURL=admin.service.js.map