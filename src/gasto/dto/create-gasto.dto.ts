import { IsNumber, IsString } from "class-validator";
import { Gasto } from "../entities/gasto.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGastoDto extends Gasto {
    
    @ApiProperty({
        description: "Valor gasto pelo usuário",
        example: 12000
    })
    @IsNumber()
    valorGasto: number;

    @ApiProperty({
        description: "Nome do Produto",
        example: "Coca-Cola 1L"
    })
    @IsString()
    nameProd: string;
}
