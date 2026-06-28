import { ApiProperty } from '@nestjs/swagger';
import { CourtStatus } from '@prisma/client';

export class CourtResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  courtNumber: number;

  @ApiProperty({
    enum: CourtStatus,
  })
  status: CourtStatus;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}