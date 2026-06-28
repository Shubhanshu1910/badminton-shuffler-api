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
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CourtResponseDto } from '../dto/court-response.dto';
import { CreateCourtDto } from '../dto/create-court.dto';
import { CourtQueryDto } from '../dto/court-query.dto';
import { UpdateCourtDto } from '../dto/update-court.dto';
import { CourtService } from '../services/court.service';

@ApiTags('Courts')
@Controller('courts')
export class CourtController {
  constructor(
    private readonly service: CourtService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Court' })
  @ApiCreatedResponse({
    type: CourtResponseDto,
  })
  create(@Body() dto: CreateCourtDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Courts' })
  findAll(@Query() query: CourtQueryDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({
    type: CourtResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCourtDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}