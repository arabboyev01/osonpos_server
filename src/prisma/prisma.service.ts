import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(config: ConfigService) {
    const pool = new Pool({ connectionString: config.get('DATABASE_URL') });
    const adapter = new PrismaPg(pool as any);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async getTenantClient(dbName: string) {
    const baseUrl = process.env.DATABASE_URL;
    if (!baseUrl) throw new Error('DATABASE_URL not found');

    const url = new URL(baseUrl);
    url.pathname = `/${dbName}`;

    const pool = new Pool({ connectionString: url.toString() });
    const adapter = new PrismaPg(pool as any);

    const client = new PrismaClient({ adapter });
    await client.$connect();
    return client;
  }
}
