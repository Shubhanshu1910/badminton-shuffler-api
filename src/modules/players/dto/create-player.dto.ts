import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({
    example: 'Shubhanshu Mishra',
  })
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiPropertyOptional({
    example: '+91XXXXXXXXXX',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    minimum: 1,
    maximum: 5,
    example: 3,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  skillLevel: number;

  @ApiPropertyOptional({
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}