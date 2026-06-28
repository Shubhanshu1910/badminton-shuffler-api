import { ApiProperty } from '@nestjs/swagger';

export class PlayerResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({
    nullable: true,
  })
  phone?: string | null;

  @ApiProperty()
  skillLevel: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  gamesPlayed: number;

  @ApiProperty()
  gamesWon: number;

  @ApiProperty()
  gamesLost: number;

  @ApiProperty()
  gamesWaited: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}