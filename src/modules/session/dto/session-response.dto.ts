import { ApiProperty } from '@nestjs/swagger';

import { SessionStatus } from '@prisma/client';

export class SessionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  totalCourts: number;

  @ApiProperty()
  maxPlayers: number;

  @ApiProperty({
    enum: SessionStatus,
  })
  status: SessionStatus;

  @ApiProperty()
  currentRound: number;

  @ApiProperty({ enum: ['ROUND_ROBIN', 'FCFS'] })
  rotationType: string;

  @ApiProperty()
  createdAt: Date;
}