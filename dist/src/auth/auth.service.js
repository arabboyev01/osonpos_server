"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcrypt"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const jwt_1 = require("@nestjs/jwt");
const execPromise = (0, util_1.promisify)(child_process_1.exec);
const tenant_service_1 = require("../tenant/tenant.service");
const log_service_1 = require("../tenant/services/log.service");
const client_1 = require("@prisma/client");
const payment_method_service_1 = require("../tenant/services/payment-method.service");
let AuthService = class AuthService {
    prisma;
    jwtService;
    configService;
    tenantService;
    logService;
    paymentMethodService;
    constructor(prisma, jwtService, configService, tenantService, logService, paymentMethodService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
        this.tenantService = tenantService;
        this.logService = logService;
        this.paymentMethodService = paymentMethodService;
    }
    async register(dto) {
        const existingUser = await this.prisma.a_User.findFirst({
            where: {
                login: dto.login,
                is_deleted: false,
            },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const { business, user } = await this.prisma.$transaction(async (tx) => {
            const dbName = dto.login.toLowerCase().replace(/[^a-z0-9_]/g, '');
            const business = await tx.a_Business.create({
                data: {
                    name: dto.businessName,
                    address: dto.address,
                    phoneNumber: dto.phoneNumber,
                    db_name: dbName,
                },
            });
            const user = await tx.a_User.create({
                data: {
                    login: dto.login,
                    password: hashedPassword,
                    full_name: dto.name,
                    role: 'OWNER',
                    business_id: business.id,
                },
            });
            return { business, user };
        });
        try {
            const dbName = business.db_name;
            if (!dbName)
                throw new Error('Database name not generated');
            await this.prisma.$executeRawUnsafe(`CREATE DATABASE ${dbName}`);
            const baseUrl = this.configService.get('DATABASE_URL');
            if (!baseUrl)
                throw new Error('DATABASE_URL is not defined in environment');
            const url = new URL(baseUrl);
            url.pathname = `/${dbName}`;
            const command = `DATABASE_URL="${url.toString()}" npx prisma db push`;
            await execPromise(command);
            await this.paymentMethodService.seedDefaults(dbName);
            return {
                message: 'Registration successful',
                businessId: business.id,
                userId: user.id,
                dbName: dbName,
            };
        }
        catch (error) {
            console.error('Error creating database:', error);
            throw new common_1.BadRequestException(`Failed to create user database: ${error.message}`);
        }
    }
    async createUser(dto) {
        const existingUser = await this.prisma.a_User.findFirst({
            where: {
                login: dto.login,
                is_deleted: false,
            },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.a_User.create({
            data: {
                ...dto,
                password: hashedPassword,
            },
        });
        const { password, ...result } = user;
        return result;
    }
    async updateUser(id, dto) {
        const user = await this.prisma.a_User.findFirst({
            where: {
                id,
                is_deleted: false,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const updateData = { ...dto };
        if (dto.password) {
            updateData.password = await bcrypt.hash(dto.password, 10);
        }
        const updatedUser = await this.prisma.a_User.update({
            where: { id },
            data: updateData,
        });
        const { password, ...result } = updatedUser;
        return result;
    }
    async login(login, pass) {
        const user = await this.prisma.a_User.findFirst({
            where: {
                login,
                is_deleted: false,
            },
        });
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            let dbName = null;
            if (user.business_id) {
                const business = await this.prisma.a_Business.findFirst({
                    where: {
                        id: user.business_id,
                        is_deleted: false,
                    },
                });
                dbName = business?.db_name || null;
            }
            if (dbName) {
                this.log(dbName, user.id, 'Owner login successful');
            }
            return {
                ...result,
                access_token: this.jwtService.sign({
                    sub: user.id,
                    login: user.login,
                    businessId: user.business_id,
                    dbName: dbName,
                }),
            };
        }
        return null;
    }
    log(dbName, userId, action, type = client_1.S_Logs_Type.AUTH, details) {
        this.logService
            .create(dbName, {
            user_id: userId,
            type,
            action,
            details,
        })
            .catch((err) => console.error(`Background log failed for ${dbName}: ${err.message}`));
    }
    async removeUser(id) {
        const user = await this.prisma.a_User.findFirst({
            where: {
                id,
                is_deleted: false,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const deletedUser = await this.prisma.a_User.update({
            where: { id },
            data: { is_deleted: true },
        });
        const { password, ...result } = deletedUser;
        return result;
    }
    async getPosWorkplaces(dbName) {
        const client = await this.tenantService.getClient(dbName);
        const workplaces = await client.a_Workplace.findMany({
            where: { is_deleted: false },
        });
        const workplacesWithEmployees = await Promise.all(workplaces.map(async (wp) => {
            const employees = await client.s_Employee.findMany({
                where: { workplace_id: wp.id },
            });
            return { ...wp, employees };
        }));
        return workplacesWithEmployees;
    }
    async employeeLogin(dbName, businessId, dto) {
        const client = await this.tenantService.getClient(dbName);
        const workplace = await client.a_Workplace.findFirst({
            where: { id: dto.workplaceId, is_deleted: false },
        });
        if (!workplace) {
            throw new common_1.NotFoundException('Workplace not found');
        }
        const employees = await client.s_Employee.findMany({
            where: { is_deleted: false },
        });
        let authenticatedEmployee = null;
        for (const employee of employees) {
            const isMatch = await bcrypt.compare(dto.pincode, employee.password);
            if (isMatch) {
                authenticatedEmployee = employee;
                break;
            }
        }
        if (!authenticatedEmployee) {
            throw new common_1.UnauthorizedException('Invalid pincode');
        }
        const { password, ...employeeInfo } = authenticatedEmployee;
        this.log(dbName, authenticatedEmployee.id, 'Employee PIN login successful', client_1.S_Logs_Type.AUTH, `Workplace: ${workplace.name}`);
        return {
            message: 'Login successful',
            employee: employeeInfo,
            workplaceId: workplace.id,
            automated_point_id: workplace.automated_point_id,
            dbName: dbName,
            pos_access_token: this.jwtService.sign({
                sub: authenticatedEmployee.id,
                login: authenticatedEmployee.full_name,
                businessId: businessId,
                dbName: dbName,
                role: 'EMPLOYEE',
                workplaceId: workplace.id,
                automated_point_id: workplace.automated_point_id,
            }),
        };
    }
    async enableSecondVerification(id, dto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        return this.prisma.a_User.update({
            where: { id },
            data: {
                second_verification: true,
                second_verification_password: hashedPassword,
            },
            select: {
                id: true,
                login: true,
                second_verification: true,
            },
        });
    }
    async disableSecondVerification(id) {
        return this.prisma.a_User.update({
            where: { id },
            data: {
                second_verification: false,
                second_verification_password: null,
            },
            select: {
                id: true,
                login: true,
                second_verification: true,
            },
        });
    }
    async updateSecondVerificationPassword(id, dto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        return this.prisma.a_User.update({
            where: { id },
            data: {
                second_verification_password: hashedPassword,
            },
            select: {
                id: true,
                login: true,
                second_verification: true,
            },
        });
    }
    async verifySecondVerificationPassword(dto) {
        const user = await this.prisma.a_User.findFirst({
            where: {
                login: dto.login,
                is_deleted: false,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (!user.second_verification || !user.second_verification_password) {
            throw new common_1.BadRequestException('Ikkinchi tekshiruv yoqilmagan');
        }
        const isMatch = await bcrypt.compare(dto.password, user.second_verification_password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException("Parol noto'g'ri");
        }
        const { password: _, second_verification_password: __, ...result } = user;
        let dbName = null;
        if (user.business_id) {
            const business = await this.prisma.a_Business.findFirst({
                where: {
                    id: user.business_id,
                    is_deleted: false,
                },
            });
            dbName = business?.db_name || null;
        }
        if (dbName) {
            this.log(dbName, user.id, 'Second verification successful');
        }
        return {
            ...result,
            access_token: this.jwtService.sign({
                sub: user.id,
                login: user.login,
                businessId: user.business_id,
                dbName: dbName,
            }),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        tenant_service_1.TenantService,
        log_service_1.LogService,
        payment_method_service_1.PaymentMethodService])
], AuthService);
//# sourceMappingURL=auth.service.js.map