import { ApiProperty } from '@nestjs/swagger';

import {
    IsInt,
    Min
} from 'class-validator';

export class UpdateScoreDto{

    @ApiProperty()

    @IsInt()

    @Min(0)

    teamAScore:number;

    @ApiProperty()

    @IsInt()

    @Min(0)

    teamBScore:number;

}