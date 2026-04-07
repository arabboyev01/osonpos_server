import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(config: ConfigService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    getTenantClient(dbName: string): Promise<PrismaClient<{
        adapter: PrismaPg;
    }, never, import("@prisma/client/runtime/client").DefaultArgs>>;
}
