import { ApiProperty } from '@nestjs/swagger';

import {
  IsArray,
  ArrayMinSize,
} from 'class-validator';

export class AddPlayerDto {
  @ApiProperty({
    example: [
      "playerId1",
      "playerId2"
    ]
  })
  @IsArray()
  @ArrayMinSize(1)
  playerIds: string[];
}