import { IsDecimal, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateToyDto {
    /**
    * A játék neve
    * @example Neon
    */
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Neon',
        description: 'A játék neve'
    })
    name!: string;

    /**
    * A játék anyaga
    * @example metal
    */
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'metal',
        description: 'A játék anyaga'
    })
    material!: string;

    /**
    * A játék súlya kilogrammban
    * @example 621
    */
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: 621,
        description: 'A játék súlya kilogrammban'
    })
    weight!: number;
}
