import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({
    example: 'Friday Evening Badminton',
  })
  @IsString()
  @Length(3, 100)
  title: string;

  @ApiPropertyOptional({
    example: 'Weekly badminton session',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    minimum: 1,
    maximum: 20,
    example: 2,
  })
  @IsInt()
  @Min(1)
  @Max(20)
  totalCourts: number;

  @ApiProperty({
    minimum: 4,
    maximum: 100,
    example: 16,
  })
  @IsInt()
  @Min(4)
  @Max(100)
  maxPlayers: number;
}