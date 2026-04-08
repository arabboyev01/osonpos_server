import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { exec } from 'child_process';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';

import {
  EnableSecondVerificationDto,
  UpdateSecondVerificationPasswordDto,
  VerifySecondVerificationDto,
} from './dto/second-verification.dto';

const execPromise = promisify(exec);

import { TenantService } from '../tenant/tenant.service';
import { PosLoginDto } from './dto/pos-auth.dto';
import { LogService } from '../tenant/services/log.service';
import { S_Logs_Type } from '@prisma/client';
import { PaymentMethodService } from '../tenant/services/payment-method.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private tenantService: TenantService,
    private logService: LogService,
    private paymentMethodService: PaymentMethodService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.a_User.findFirst({
      where: {
        login: dto.login,
        is_deleted: false,
      },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Using transaction to ensure both are created
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
      if (!dbName) throw new Error('Database name not generated');

      await this.prisma.$executeRawUnsafe(`CREATE DATABASE ${dbName}`);

      const baseUrl = this.configService.get<string>('DATABASE_URL');
      if (!baseUrl)
        throw new Error('DATABASE_URL is not defined in environment');

      const url = new URL(baseUrl);
      url.pathname = `/${dbName}`;

      const command = `DATABASE_URL="${url.toString()}" npx prisma db push`;
      await execPromise(command);

      // Seed default data for new tenant
      await this.paymentMethodService.seedDefaults(dbName);

      return {
        message: 'Registration successful',
        businessId: business.id,
        userId: user.id,
        dbName: dbName,
      };
    } catch (error) {
      console.error('Error creating database:', error);
      // Note: In a production app, you might want to rollback the business/user creation if DB creation fails
      throw new BadRequestException(
        `Failed to create user database: ${error.message}`,
      );
    }
  }

  async createUser(dto: CreateUserDto) {
    const existingUser = await this.prisma.a_User.findFirst({
      where: {
        login: dto.login,
        is_deleted: false,
      },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
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

  async updateUser(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.a_User.findFirst({
      where: {
        id,
        is_deleted: false,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updateData: any = { ...dto };
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

  async login(login: string, pass: string) {
    const user = await this.prisma.a_User.findFirst({
      where: {
        login,
        is_deleted: false,
      },
    });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;

      let dbName: string | null = null;
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

  // Safe background logging
  private log(
    dbName: string,
    userId: string | undefined,
    action: string,
    type: S_Logs_Type = S_Logs_Type.AUTH,
    details?: string,
  ) {
    this.logService
      .create(dbName, {
        user_id: userId,
        type,
        action,
        details,
      })
      .catch((err) =>
        console.error(`Background log failed for ${dbName}: ${err.message}`),
      );
  }

  async removeUser(id: string) {
    const user = await this.prisma.a_User.findFirst({
      where: {
        id,
        is_deleted: false,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const deletedUser = await this.prisma.a_User.update({
      where: { id },
      data: { is_deleted: true },
    });
    const { password, ...result } = deletedUser;
    return result;
  }

  async getPosWorkplaces(dbName: string) {
    const client = await this.tenantService.getClient(dbName);

    const workplaces = await client.a_Workplace.findMany({
      where: { is_deleted: false },
    });

    const workplacesWithEmployees = await Promise.all(
      workplaces.map(async (wp) => {
        const employees = await client.s_Employee.findMany({
          where: { workplace_id: wp.id },
        });
        return { ...wp, employees };
      }),
    );

    return workplacesWithEmployees;
  }

  async employeeLogin(dbName: string, businessId: string, dto: PosLoginDto) {
    const client = await this.tenantService.getClient(dbName);

    const workplace = await client.a_Workplace.findFirst({
      where: { id: dto.workplaceId, is_deleted: false },
    });
    if (!workplace) {
      throw new NotFoundException('Workplace not found');
    }

    const employees = await client.s_Employee.findMany({
      where: { is_deleted: false },
    });

    let authenticatedEmployee: any = null;
    for (const employee of employees) {
      const isMatch = await bcrypt.compare(dto.pincode, employee.password);
      if (isMatch) {
        authenticatedEmployee = employee;
        break;
      }
    }

    if (!authenticatedEmployee) {
      throw new UnauthorizedException('Invalid pincode');
    }

    const { password, ...employeeInfo } = authenticatedEmployee;

    const role = await client.s_Employee_Role.findFirst({
      where: { id: authenticatedEmployee.role_id, is_deleted: false },
    });

    // Log employee login
    this.log(
      dbName,
      authenticatedEmployee.id,
      'Employee PIN login successful',
      S_Logs_Type.AUTH,
      `Workplace: ${workplace.name}`,
    );

    return {
      message: 'Login successful',
      employee: {
        ...employeeInfo,
        role: role,
      },
      workplaceId: workplace.id,
      automated_point_id: workplace.automated_point_id,
      dbName: dbName,
      pos_access_token: this.jwtService.sign({
        sub: authenticatedEmployee.id,
        login: authenticatedEmployee.full_name, // Using name as login identifier
        businessId: businessId,
        dbName: dbName,
        role: 'EMPLOYEE',
        workplaceId: workplace.id,
        automated_point_id: workplace.automated_point_id,
      }),
    };
  }

  // Second Verification Logic
  async enableSecondVerification(id: string, dto: EnableSecondVerificationDto) {
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

  async disableSecondVerification(id: string) {
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

  async updateSecondVerificationPassword(
    id: string,
    dto: UpdateSecondVerificationPasswordDto,
  ) {
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

  async verifySecondVerificationPassword(dto: VerifySecondVerificationDto) {
    const user = await this.prisma.a_User.findFirst({
      where: {
        login: dto.login,
        is_deleted: false,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.second_verification || !user.second_verification_password) {
      throw new BadRequestException('Ikkinchi tekshiruv yoqilmagan');
    }

    const isMatch = await bcrypt.compare(
      dto.password,
      user.second_verification_password,
    );
    if (!isMatch) {
      throw new UnauthorizedException("Parol noto'g'ri");
    }

    const { password: _, second_verification_password: __, ...result } = user;

    let dbName: string | null = null;
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
}
