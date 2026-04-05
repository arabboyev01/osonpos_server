import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AdminLoginDto } from './dto/admin-auth.dto';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async login(dto: AdminLoginDto) {
    const adminLogin = this.configService.get('ADMIN_LOGIN');
    const adminPass = this.configService.get('ADMIN_PASSWORD');

    if (dto.login !== adminLogin || dto.password !== adminPass) {
      throw new UnauthorizedException('Admin login failed');
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
          email: businessOwner.details, // If business table doesn't have it, maybe it is in user details
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
}
