import { Module } from '@nestjs/common';

import { ShuffleService } from './services/shuffle.service';

@Module({
  providers: [ShuffleService],
  exports: [ShuffleService],
})
export class ShuffleModule {}