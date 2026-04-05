import 'dotenv/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const secret = process.env.JWT_SECRET || 'defaultSecret';
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
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
      throw new UnauthorizedException();
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
}
