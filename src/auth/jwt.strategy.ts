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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'defaultSecret',
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.a_User.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    let dbName = payload.dbName;
    let businessId = payload.businessId || user.business_id;

    if (!dbName && businessId) {
      const business = await this.prisma.a_Business.findUnique({
        where: { id: businessId },
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
