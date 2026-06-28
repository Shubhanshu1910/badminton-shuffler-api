import { PrismaClient, } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../src/common/enums/role.enum';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const passwordHash = await bcrypt.hash('Admin@123', 10);

  await prisma.user.upsert({
    where: {
      email: 'admin@badminton.com',
    },
    update: {},
    create: {
      fullName: 'Administrator',
      email: 'admin@badminton.com',
      passwordHash,
      role: UserRole.ADMIN,
    },
  });

  console.log('✅ Admin user seeded');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });