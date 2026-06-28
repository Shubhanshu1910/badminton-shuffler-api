import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreatePlayerDto } from '../dto/create-player.dto';
import { PlayerQueryDto } from '../dto/player-query.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { PlayerService } from '../services/player.service';

@ApiTags('Players')
@Controller('players')
export class PlayerController {
  constructor(
    private readonly service: PlayerService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create Player',
  })
  create(
    @Body() dto: CreatePlayerDto,
  ) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get All Players',
  })
  findAll(
    @Query() query: PlayerQueryDto,
  ) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get Player',
  })
  findOne(
    @Param('id') id: string,
  ) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update Player',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePlayerDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete Player',
  })
  remove(
    @Param('id') id: string,
  ) {
    return this.service.remove(id);
  }
}