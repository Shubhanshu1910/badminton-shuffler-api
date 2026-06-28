import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({
    example: true,
  })
  success: boolean;

  @ApiProperty({
    example: 'Request completed successfully.',
  })
  message: string;

  @ApiProperty({
    example: '2026-06-27T15:30:00.000Z',
  })
  timestamp: string;

  data: T;

  constructor(message: string, data: T) {
    this.success = true;
    this.message = message;
    this.timestamp = new Date().toISOString();
    this.data = data;
  }
}