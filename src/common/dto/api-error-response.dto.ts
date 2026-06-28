import { ApiProperty } from '@nestjs/swagger';

export class ApiErrorResponseDto {
  @ApiProperty({ example: false })
  success: false;

  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Resource not found.' })
  message: string;

  @ApiProperty({ example: '/api/players/invalid-id' })
  path: string;

  @ApiProperty({ example: '2026-06-27T15:30:00.000Z' })
  timestamp: string;
}
