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

  // Check for individual database name argument
  const targetDb = process.argv[2];

  if (targetDb) {
    console.log(`\n--- Migrating individual database: ${targetDb} ---`);
    const url = new URL(baseUrl);
    url.pathname = `/${targetDb}`;
    
    try {
      execSync(`node --max-old-space-size=1024 ./node_modules/.bin/prisma db push --accept-data-loss`, {
        env: {
          ...process.env,
          DATABASE_URL: url.toString(),
          PRISMA_SKIP_POSTINSTALL_GENERATE: 'true',
          PRISMA_ENGINE_TYPE: 'binary',
        },
        timeout: 300000,
        stdio: 'inherit',
      });
      console.log(`\nSuccessfully migrated ${targetDb}`);
    } catch (error) {
      console.error(`Failed to migrate ${targetDb}: ${error.message}`);
      process.exit(1);
    }
    return;
  }

  const pool = new Pool({ connectionString: baseUrl });
  const adapter = new PrismaPg(pool as any);
  const prisma = new PrismaClient({ adapter });

  console.log('--- Migrating Main (Admin) Database ---');
  try {
    execSync(`node --max-old-space-size=1024 ./node_modules/.bin/prisma db push --accept-data-loss`, {
      env: {
        ...process.env,
        DATABASE_URL: baseUrl,
        PRISMA_SKIP_POSTINSTALL_GENERATE: 'true',
      },
      timeout: 300000,
      stdio: 'inherit',
    });
    console.log('Main database migrated successfully.');
  } catch (error) {
    console.error('Failed to migrate main database:', error.message);
    process.exit(1);
  }

  console.log('\nFetching tenants from admin database...');
  
  try {
    const businesses = await prisma.a_Business.findMany({
      where: {
        db_name: { not: null },
        is_deleted: false,
      },
      select: {
        id: true,
        name: true,
        db_name: true,
      },
    });

    console.log(`Found ${businesses.length} active tenants.`);

    for (const business of businesses) {
      const dbName = business.db_name;
      if (!dbName) continue;

      console.log(`\n--- Migrating tenant: ${business.name} (DB: ${dbName}) ---`);
      
      const url = new URL(baseUrl);
      url.pathname = `/${dbName}`;
      
      const maskedUrl = url.toString().replace(/:([^:@]+)@/, ':***@');
      console.log(`Constructed URL for ${dbName}: ${maskedUrl}`);
      
      try {
        console.log(`Starting migration for ${dbName}...`);
        execSync(`node --max-old-space-size=1024 ./node_modules/.bin/prisma db push --accept-data-loss`, {
          env: {
            ...process.env,
            DATABASE_URL: url.toString(),
            PRISMA_SKIP_POSTINSTALL_GENERATE: 'true',
            PRISMA_ENGINE_TYPE: 'binary',
          },
          timeout: 300000,
          stdio: 'inherit',
        });
        console.log(`Successfully migrated ${business.name}`);
      } catch (error) {
        console.error(`Failed to migrate ${business.name}: ${error.message}`);
        if (error.code === 'ETIMEDOUT') {
          console.error('Migration timed out.');
        }
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

