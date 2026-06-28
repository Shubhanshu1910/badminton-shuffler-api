import { Court } from '@prisma/client';

import { CourtResponseDto } from '../dto/court-response.dto';

export class CourtMapper {
  static toResponse(court: Court): CourtResponseDto {
    return {
      id: court.id,
      name: court.name,
      courtNumber: court.courtNumber,
      status: court.status,
      isActive: court.isActive,
      createdAt: court.createdAt,
      updatedAt: court.updatedAt,
    };
  }

  static toResponseList(courts: Court[]): CourtResponseDto[] {
    return courts.map((court) => this.toResponse(court));
  }
}