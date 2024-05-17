import { IsNumber, IsString } from "class-validator";
import { Ganho } from "../entities/ganho.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGanhoDto extends Ganho {
    
    @ApiProperty({
        description: "Valor Ganho pelo usuário",
        example: 12000
    })
    @IsNumber()
    valorGanho: number;

    @ApiProperty({
        description: "Descrição do Ganho",
        example: "Salário Recebido"
    })
    
    @IsString()
    nomeProd: string;

}
