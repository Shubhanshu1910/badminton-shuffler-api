import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AddCourtDto } from '../dto/add-court.dto';
import { AddPlayerDto } from '../dto/add-player.dto';
import { CreateSessionDto } from '../dto/create-session.dto';
import { SessionResponseDto } from '../dto/session-response.dto';
import { UpdateSessionDto } from '../dto/update-session.dto';
import { SessionService } from '../services/session.service';

@ApiTags('Sessions')
@Controller('sessions')
export class SessionController {
  constructor(
    private readonly service: SessionService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create Session',
  })
  @ApiCreatedResponse({
    type: SessionResponseDto,
  })
  create(@Body() dto: CreateSessionDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get All Sessions',
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: SessionResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSessionDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post(':id/players')
  addPlayers(
    @Param('id') id: string,
    @Body() dto: AddPlayerDto,
  ) {
    return this.service.addPlayers(id, dto);
  }

  @Post(':id/courts')
  assignCourts(
    @Param('id') id: string,
    @Body() dto: AddCourtDto,
  ) {
    return this.service.assignCourts(id, dto);
  }

  @Post(':id/start')
  start(@Param('id') id: string) {
    return this.service.start(id);
  }

  @Post(':id/end')
  end(@Param('id') id: string) {
    return this.service.end(id);
  }
}