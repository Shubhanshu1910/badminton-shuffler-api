import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { PrismaRepository } from './prisma.repository';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}