import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class JoinSessionDto {
  @ApiProperty()
  @IsString()
  sessionId: string;

  @ApiProperty()
  @IsString()
  userName: string;
}