import { TenantService } from '../tenant.service';
export declare class LoggerService {
    private tenantService;
    constructor(tenantService: TenantService);
    log(dbName: string, userId: string | null, type: 'SYSTEM' | 'USER' | 'EMPLOYEE' | 'PAYMENT_DEVICE' | 'ORDER' | 'AUTH', action: string, details?: string): Promise<void>;
}
