import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AdminLoginDto } from './dto/admin-auth.dto';
export declare class AdminService {
    private prisma;
    private configService;
    private jwtService;
    constructor(prisma: PrismaService, configService: ConfigService, jwtService: JwtService);
    login(dto: AdminLoginDto): Promise<{
        message: string;
        access_token: string;
    }>;
    getBusinessesWithOwners(): Promise<{
        owner: {
            id: string;
            login: string;
            full_name: string | null;
            role: string;
            public_name: string | null;
            email: string | null;
            dt_created: Date;
        } | null;
        name: string;
        phoneNumber: string | null;
        address: string | null;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        db_name: string | null;
        email: string | null;
    }[]>;
    getAllRegisteredUsers(): Promise<{
        login: string;
        full_name: string | null;
        role: string;
        business_id: string | null;
        language: string;
        time_zone: string;
        id: string;
        public_name: string | null;
        dt_created: Date;
    }[]>;
}
