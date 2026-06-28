import { ApiProperty } from '@nestjs/swagger';

export class RoundResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  sessionId: string;

  @ApiProperty()
  roundNumber: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;
}