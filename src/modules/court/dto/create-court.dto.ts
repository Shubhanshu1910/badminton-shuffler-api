import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateCourtDto {
  @ApiProperty({
    example: 'Court 1',
  })
  @IsString()
  @Length(2, 50)
  name: string;

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  @Min(1)
  courtNumber: number;

  @ApiPropertyOptional({
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}