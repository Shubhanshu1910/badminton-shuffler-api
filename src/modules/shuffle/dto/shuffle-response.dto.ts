import { ApiProperty } from '@nestjs/swagger';

export class MatchDto {

  @ApiProperty()

  courtNumber: number;

  @ApiProperty({
    type:[String]
  })

  teamA:string[];

  @ApiProperty({
    type:[String]
  })

  teamB:string[];

}

export class ShuffleResponseDto{

  @ApiProperty({
    type:[MatchDto]
  })

  matches:MatchDto[];

  @ApiProperty({
    type:[String]
  })

  waitingPlayers:string[];

}