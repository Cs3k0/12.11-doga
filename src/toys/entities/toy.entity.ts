import { toy } from "generated/prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class ToyEntity implements toy {
  @ApiProperty({
    example: 1,
    description: 'A játék egyedi azonosítója',
  })
  id!: number;

  @ApiProperty({
    example: 'Neon',
    description: 'A játék neve',
  })
  name!: string;

  @ApiProperty({
    example: 'metal',
    description: 'A játék anyaga',
  })
  material!: string;

  @ApiProperty({
    example: 621,
    description: 'A játék súlya kilogrammban',
  })
  weight!: number;
}
