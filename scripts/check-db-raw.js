const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  try {
    const resB = await client.query('SELECT id, name, db_name FROM "A_Business"');
    console.log('Businesses:', JSON.stringify(resB.rows, null, 2));
    
    const resU = await client.query('SELECT id, login, business_id FROM "A_User"');
    console.log('Users:', JSON.stringify(resU.rows, null, 2));
  } finally {
    await client.end();
  }
}
main().catch(console.error);
