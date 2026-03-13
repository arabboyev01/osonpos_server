import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { login: dto.login },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const business = await this.prisma.business.create({
      data: {
        name: dto.businessName,
        address: dto.address,
        phoneNumber: dto.phoneNumber,
        users: {
          create: {
            login: dto.login,
            password: hashedPassword,
            name: dto.name,
          },
        },
      },
    });

    try {
      const dbName = dto.login.toLowerCase().replace(/[^a-z0-9_]/g, '');
      await this.prisma.$executeRawUnsafe(`CREATE DATABASE ${dbName}`);

      const baseUrl = process.env.DATABASE_URL;
      if (!baseUrl) throw new Error('DATABASE_URL is not defined in environment');
      
      const url = new URL(baseUrl);
      url.pathname = `/${dbName}`;
      
      const command = `DATABASE_URL="${url.toString()}" npx prisma db push`;
      await execPromise(command);

      return {
        message: 'Registration successful',
        businessId: business.id,
        dbName: dbName,
      };
    } catch (error) {
      console.error('Error creating database:', error);
      throw new BadRequestException(`Failed to create user database: ${error.message}`);
    }
  }

  async login(login: string, pass: string) {
    const user = await this.prisma.user.findUnique({
      where: { login },
    });
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return {
        ...result,
        access_token: this.jwtService.sign({
          sub: user.id,
          login: user.login,
          businessId: user.businessId,
        }),
      };
    }
    return null;
  }
}
