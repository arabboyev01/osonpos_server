import { TenantService } from '../tenant.service';
export declare class QueryService {
    private tenantService;
    constructor(tenantService: TenantService);
    executeQuery(dbName: string, sql: string): Promise<any>;
}
