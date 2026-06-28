import { Player } from '@prisma/client';

import { PlayerResponseDto } from '../dto/player-response.dto';

export class PlayerMapper {
  static toResponse(player: Player): PlayerResponseDto {
    return {
      id: player.id,
      name: player.name,
      phone: player.phone,
      skillLevel: player.skillLevel,
      isActive: player.isActive,
      gamesPlayed: player.gamesPlayed,
      gamesWon: player.gamesWon,
      gamesLost: player.gamesLost,
      gamesWaited: player.gamesWaited,
      createdAt: player.createdAt,
      updatedAt: player.updatedAt,
    };
  }

  static toResponseList(players: Player[]): PlayerResponseDto[] {
    return players.map(this.toResponse);
  }
}