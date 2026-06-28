import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LeaveSessionDto {
  @ApiProperty()
  @IsString()
  sessionId: string;
}