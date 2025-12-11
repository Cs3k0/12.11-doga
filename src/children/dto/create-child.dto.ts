import { IsDecimal, IsNotEmpty, IsString } from "class-validator";


export class CreateChildDto {
        @IsString()
        @IsNotEmpty()
        name: string;
        @IsString()
        @IsNotEmpty()
        address: string;
        @IsString()
        @IsNotEmpty()
        country: string
        @IsNotEmpty()
        good: boolean;
}
