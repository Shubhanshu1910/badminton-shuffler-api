import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class HealthResponseDto {
  @ApiProperty({
    example: 'ok',
    description: 'Application health status',
  })
  @IsString()
  status: string;
}
