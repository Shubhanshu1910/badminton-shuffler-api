import { ApiProperty } from '@nestjs/swagger';

export class PlayerEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone?: string;

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