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
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: any) => {
          const header =
            req.headers['pos_authorization'] ||
            req.headers['POS_Authorization'];
          if (header) {
            return header.startsWith('Bearer ') ? header.substring(7) : header;
          }
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'defaultSecret',
    });
  }

  async validate(payload: any) {
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
