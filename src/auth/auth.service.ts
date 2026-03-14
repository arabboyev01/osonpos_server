import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { exec } from 'child_process';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';

const execPromise = promisify(exec);

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.a_User.findUnique({
      where: { login: dto.login },
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
      if (!baseUrl) throw new Error('DATABASE_URL is not defined in environment');
      
      const url = new URL(baseUrl);
      url.pathname = `/${dbName}`;
      
      const command = `DATABASE_URL="${url.toString()}" npx prisma db push`;
      await execPromise(command);

      return {
        message: 'Registration successful',
        businessId: business.id,
        userId: user.id,
        dbName: dbName,
      };
    } catch (error) {
      console.error('Error creating database:', error);
      // Note: In a production app, you might want to rollback the business/user creation if DB creation fails
      throw new BadRequestException(`Failed to create user database: ${error.message}`);
    }
  }

  async createUser(dto: CreateUserDto) {
    const existingUser = await this.prisma.a_User.findUnique({
      where: { login: dto.login },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.a_User.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
    });
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.a_User.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updateData: any = { ...dto };
    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10);
    }

    return this.prisma.a_User.update({
      where: { id },
      data: updateData,
    });
  }

  async login(login: string, pass: string) {
    const user = await this.prisma.a_User.findUnique({
      where: { login },
    });
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return {
        ...result,
        access_token: this.jwtService.sign({
          sub: user.id,
          login: user.login,
          businessId: user.business_id,
        }),
      };
    }
    return null;
  }
}
