import { Module } from '@nestjs/common';

import { CourtController } from './controllers/court.controller';
import { CourtRepository } from './repositories/court.repository';
import { CourtService } from './services/court.service';

@Module({
  controllers: [CourtController],
  providers: [
    CourtRepository,
    CourtService,
  ],
  exports: [CourtService],
})
export class CourtModule {}