import { IsDecimal, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateChildDto {
        /**
        * A gyermek neve
        * @example Darla Hegmann
        */
        @IsString()
        @IsNotEmpty()
        @ApiProperty({
                example: 'Darla Hegmann',
                description: 'A gyermek neve'
        })
        name!: string;


        /**
        * A gyermek címe
        * @example 3245 Stamm Harbor
        */
        @IsString()
        @IsNotEmpty()
        @ApiProperty({
                example: '3245 Stamm Harbor',
                description: 'A gyermek címe'
        })
        address!: string;

        
        /**
        * Az ország
        * @example Cayman Islands
        */
        @IsString()
        @IsNotEmpty()
        @ApiProperty({
                example: 'Cayman Islands',
                description: 'Az ország'
        })
        country!: string;


        /**
        * Jó gyerek-e (0/1)
        * @example 0
        */
        @IsNotEmpty()
        @IsDecimal()
        @ApiProperty({
                example: 0,
                description: 'Jó gyerek-e (0/1)'
        })
        good!: boolean;
}
