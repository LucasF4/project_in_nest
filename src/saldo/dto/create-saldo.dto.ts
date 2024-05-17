import { IsNumber } from "class-validator";
import { Saldo } from "../entities/saldo.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSaldoDto extends Saldo{

    @ApiProperty({
        description: "Valor inicial a ser passado",
        example: 500000
    })
    @IsNumber()
    valorInit: number;

}
