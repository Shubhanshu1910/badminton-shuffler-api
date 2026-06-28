import { ApiProperty } from '@nestjs/swagger';

import {
  ArrayMinSize,
  IsArray,
} from 'class-validator';

export class AddCourtDto {
  @ApiProperty({
    example: [
      "court1",
      "court2"
    ]
  })
  @IsArray()
  @ArrayMinSize(1)
  courtIds: string[];
}