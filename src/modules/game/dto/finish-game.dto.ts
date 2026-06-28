import { ApiProperty } from '@nestjs/swagger';

import {
    IsInt,
    Min,
    Max
} from 'class-validator';

export class FinishGameDto{

    @ApiProperty({
        example:1
    })

    @IsInt()

    @Min(1)

    @Max(2)

    winner:number;

}