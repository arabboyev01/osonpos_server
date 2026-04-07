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
exports.JwtStrategy = void 0;
require("dotenv/config");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    configService;
    prisma;
    constructor(configService, prisma) {
        const secret = process.env.JWT_SECRET || 'defaultSecret';
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
        this.configService = configService;
        this.prisma = prisma;
    }
    async validate(payload) {
        if (payload.sub === 'static_admin_id') {
            return {
                id: payload.sub,
                login: payload.login,
                role: 'SUPERADMIN',
            };
        }
        const user = await this.prisma.a_User.findFirst({
            where: {
                id: payload.sub,
                is_deleted: false,
            },
        });
        if (!user) {
            if (payload.role === 'EMPLOYEE') {
                return {
                    id: payload.sub,
                    login: payload.login,
                    role: 'EMPLOYEE',
                    businessId: payload.businessId,
                    dbName: payload.dbName,
                    workplaceId: payload.workplaceId,
                };
            }
            throw new common_1.UnauthorizedException();
        }
        let dbName = payload.dbName;
        let businessId = payload.businessId || user.business_id;
        if (!dbName && businessId) {
            const business = await this.prisma.a_Business.findFirst({
                where: {
                    id: businessId,
                    is_deleted: false,
                },
            });
            dbName = business?.db_name;
        }
        const { password, ...result } = user;
        return {
            ...result,
            dbName,
            businessId,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map