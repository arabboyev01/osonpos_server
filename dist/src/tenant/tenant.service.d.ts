import { OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class TenantService implements OnModuleDestroy {
    private clients;
    private pools;
    getClient(dbName: string): Promise<PrismaClient>;
    onModuleDestroy(): Promise<void>;
    getAutomatedPointId(client: any, workplaceId?: string): Promise<string | null>;
}
