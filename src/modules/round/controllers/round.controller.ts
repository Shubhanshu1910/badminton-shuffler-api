import {
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RoundService } from '../services/round.service';

@ApiTags('Round')
@Controller('rounds')
export class RoundController {
  constructor(
    private readonly service: RoundService,
  ) {}

  @Post(':sessionId/generate')
  generate(
    @Param('sessionId') sessionId: string,
  ) {
    return this.service.generate(
      sessionId,
    );
  }

  @Get(':sessionId/current')
  getCurrentRound(
    @Param('sessionId') sessionId: string,
  ) {
    return this.service.getCurrentRound(
      sessionId,
    );
  }
}