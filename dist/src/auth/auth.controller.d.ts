import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PosLoginDto } from './dto/pos-auth.dto';
import { EnableSecondVerificationDto, UpdateSecondVerificationPasswordDto, VerifySecondVerificationDto } from './dto/second-verification.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        message: string;
        businessId: string;
        userId: string;
        dbName: string;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
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
    }>;
    getProfile(req: any): any;
    createUser(dto: CreateUserDto): Promise<{
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
    }>;
    updateUser(id: string, dto: UpdateUserDto): Promise<{
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
    }>;
    deleteUser(id: string): Promise<{
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
    }>;
    getPosWorkplaces(req: any): Promise<{
        employees: {
            password: string;
            full_name: string;
            id: string;
            is_deleted: boolean;
            dt_created: Date;
            dt_updated: Date;
            guid: string | null;
            email: string | null;
            role_id: string;
            employee_address: string | null;
            workplace_id: string | null;
            telegram_id: string | null;
            phone_number: string | null;
            notes: string | null;
        }[];
        name: string;
        id: string;
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
        guid: string | null;
        automated_point_id: string;
    }[]>;
    posLogin(req: any, dto: PosLoginDto): Promise<{
        message: string;
        employee: any;
        workplaceId: string;
        automated_point_id: string;
        dbName: string;
        pos_access_token: string;
    }>;
    enableSecondVerification(req: any, dto: EnableSecondVerificationDto): Promise<{
        login: string;
        id: string;
        second_verification: boolean;
    }>;
    disableSecondVerification(req: any): Promise<{
        login: string;
        id: string;
        second_verification: boolean;
    }>;
    updateSecondVerificationPassword(req: any, dto: UpdateSecondVerificationPasswordDto): Promise<{
        login: string;
        id: string;
        second_verification: boolean;
    }>;
    verifySecondVerification(dto: VerifySecondVerificationDto): Promise<{
        access_token: string;
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
        is_deleted: boolean;
        dt_created: Date;
        dt_updated: Date;
    }>;
}
