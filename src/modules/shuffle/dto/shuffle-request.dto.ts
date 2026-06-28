import {
  ApiProperty,
} from '@nestjs/swagger';

export class ShuffleRequestDto {

  @ApiProperty()

  sessionId: string;

}