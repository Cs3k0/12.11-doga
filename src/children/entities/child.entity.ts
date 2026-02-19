import { child } from "generated/prisma/client";
import { ApiProperty } from "@nestjs/swagger";
export class ChildEntity implements child {
    @ApiProperty({
        example: 1,
        description: 'A gyermek egyedi azonosítója'
    })
    id!: number;
    @ApiProperty({
        example: 'Darla Hegmann',
        description: 'A gyermek neve'
    })
    name!: string;
    @ApiProperty({
        example: '3245 Stamm Harbor',
        description: 'A gyermek címe' 
    })
    address!: string;
    @ApiProperty({
        example: 'Cayman Islands',
        description: 'Az ország'
    })
    country!: string;
    @ApiProperty({
        example: 0,
        description: 'Jó gyerek-e (0/1)'
    })
    good!: boolean;

}
