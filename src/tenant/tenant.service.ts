import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class TenantService implements OnModuleDestroy {
  private clients: Map<string, PrismaClient> = new Map();
  private pools: Map<string, Pool> = new Map();

  async getClient(dbName: string): Promise<PrismaClient> {
    if (!dbName || dbName === 'undefined') {
      throw new Error(
        'Tenant database name is missing or invalid ("undefined"). Please ensure you are logged in correctly.',
      );
    }

    if (this.clients.has(dbName)) {
      return this.clients.get(dbName)!;
    }

    const baseUrl = process.env.DATABASE_URL;
    if (!baseUrl) throw new Error('DATABASE_URL not found');

    const url = new URL(baseUrl);
    url.pathname = `/${dbName}`;

    const pool = new Pool({ connectionString: url.toString() });
    const adapter = new PrismaPg(pool as any);
    const client = new PrismaClient({ adapter });

    await client.$connect();

    this.clients.set(dbName, client);
    this.pools.set(dbName, pool);

    return client;
  }

  async onModuleDestroy() {
    for (const client of this.clients.values()) {
      await client.$disconnect();
    }
    for (const pool of this.pools.values()) {
      await pool.end();
    }
  }
}
