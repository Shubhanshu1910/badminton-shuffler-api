import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StartGameDto {
  @ApiProperty({
    example: 'cmqy7kcq10000wa0gvq3msuxt',
  })
  @IsString()
  @IsNotEmpty()
  matchId: string;
}