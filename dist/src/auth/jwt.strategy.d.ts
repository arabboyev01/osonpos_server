import 'dotenv/config';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    validate(payload: any): Promise<{
        id: any;
        login: any;
        role: string;
        businessId?: undefined;
        dbName?: undefined;
        workplaceId?: undefined;
    } | {
        id: any;
        login: any;
        role: string;
        businessId: any;
        dbName: any;
        workplaceId: any;
    } | {
        dbName: any;
        businessId: any;
        login: string;
        full_name: string | null;
        role: string;
        business_id: string | null;
        language: string;
        time_zone: string;
        id: string;
        public_name: string | null;
        details: string | null;
        second_verification: boolean;
        second_verification_password: string | null;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        workplaceId?: undefined;
    }>;
}
export {};
