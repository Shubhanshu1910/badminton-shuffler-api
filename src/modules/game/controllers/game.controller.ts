import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { GameService } from '../services/game.service';
import { FinishGameDto } from '../dto/finish-game.dto';
import { StartGameDto } from '../dto/start-game.dto';
import { UpdateScoreDto } from '../dto/update-score.dto';

@ApiTags('Game')
@Controller('game')
export class GameController {
  constructor(
    private readonly service: GameService,
  ) {}

  @Post('start')
  @ApiOperation({
    summary: 'Start Match',
  })
  start(
    @Body() dto: StartGameDto,
  ) {
    return this.service.start(dto);
  }

  @Patch(':id/score')
  @ApiOperation({
    summary: 'Update Match Score',
  })
  updateScore(
    @Param('id') id: string,
    @Body() dto: UpdateScoreDto,
  ) {
    return this.service.updateScore(id, dto);
  }

  @Post(':id/finish')
  @ApiOperation({
    summary: 'Finish Match',
  })
  finish(
    @Param('id') id: string,
    @Body() dto: FinishGameDto,
  ) {
    return this.service.finish(id, dto);
  }
}