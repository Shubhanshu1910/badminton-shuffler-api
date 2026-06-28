import { ApiProperty } from '@nestjs/swagger';

export class CompleteRoundDto {
  @ApiProperty({
    example: true,
  })
  completed: boolean;
}