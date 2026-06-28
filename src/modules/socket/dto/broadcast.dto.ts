import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class BroadcastDto {
  @ApiProperty()
  @IsString()
  sessionId: string;

  @ApiProperty({
    type: Object,
  })
  @IsObject()
  payload: Record<string, any>;
}