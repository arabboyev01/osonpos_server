import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { execSync } from 'child_process';
import * as dotenv from 'dotenv';

dotenv.config();

async function migrateAllTenants() {
  const baseUrl = process.env.DATABASE_URL;
  if (!baseUrl) {
    throw new Error('DATABASE_URL is not defined in environment');
  }

  const pool = new Pool({ connectionString: baseUrl });
  const adapter = new PrismaPg(pool as any);
  const prisma = new PrismaClient({ adapter });

  console.log('Fetching tenants from admin database...');
  
  try {
    const businesses = await prisma.a_Business.findMany({
      where: {
        db_name: { not: null },
        is_deleted: false,
      },
      select: {
        name: true,
        db_name: true,
      },
    });

    console.log(`Found ${businesses.length} tenants.`);

    for (const business of businesses) {
      const dbName = business.db_name;
      if (!dbName) continue;

      console.log(`\n--- Migrating tenant: ${business.name} (DB: ${dbName}) ---`);
      
      const url = new URL(baseUrl);
      url.pathname = `/${dbName}`;
      
      try {
        console.log(`Starting migration for ${dbName}...`);
        // Use local prisma binary and skip-generate to avoid redundant client generation
        execSync(`./node_modules/.bin/prisma db push --accept-data-loss`, {
          env: {
            ...process.env,
            DATABASE_URL: url.toString(),
            PRISMA_SKIP_POSTINSTALL_GENERATE: 'true',
          },
          stdio: 'inherit',
        });
        console.log(`Successfully migrated ${business.name}`);
      } catch (error) {
        console.error(`Failed to migrate ${business.name}:`, error.message);
      }
    }
  } catch (error) {
    console.error('Error during migration process:', error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

migrateAllTenants();
