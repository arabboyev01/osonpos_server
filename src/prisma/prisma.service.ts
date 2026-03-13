import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(config: ConfigService) {
    const pool = new Pool({ connectionString: config.get('DATABASE_URL') });
    // Using 'as any' to bypass type mismatches between different versions of @types/pg
    const adapter = new PrismaPg(pool as any);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Helper to get a client for a specific database
  async getTenantClient(dbName: string) {
    const baseUrl = process.env.DATABASE_URL;
    if (!baseUrl) throw new Error('DATABASE_URL not found');
    
    // Construct the URL for the new DB
    const url = new URL(baseUrl);
    url.pathname = `/${dbName}`;
    
    const pool = new Pool({ connectionString: url.toString() });
    const adapter = new PrismaPg(pool as any);
    
    const client = new PrismaClient({ adapter });
    await client.$connect();
    return client;
  }
}
