import { IsDecimal, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateToyDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    material: string
    @IsNotEmpty()
    @IsNumber()
    weight: number
}
