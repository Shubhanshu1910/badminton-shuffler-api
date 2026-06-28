import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class MatchDto {
  @ApiProperty()
  courtId: string;

  @ApiProperty({
    type: [String],
  })
  teamA: string[];

  @ApiProperty({
    type: [String],
  })
  teamB: string[];
}

export class CreateRoundDto {
  @ApiProperty()
  @IsString()
  sessionId: string;

  @ApiProperty({
    type: [MatchDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MatchDto)
  matches: MatchDto[];

  @ApiProperty({
    type: [String],
  })
  waitingPlayers: string[];
}

export class GenerateRoundDto {

  @ApiProperty()

  sessionId:string;

}