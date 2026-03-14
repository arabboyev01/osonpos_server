import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const businesses = await prisma.a_Business.findMany();
  console.log(JSON.stringify(businesses, null, 2));
  const users = await prisma.a_User.findMany();
  console.log(JSON.stringify(users, null, 2));
}

main().finally(() => prisma.$disconnect());
