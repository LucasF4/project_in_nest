import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGanhoDto } from './create-ganho.dto';

export class UpdateGanhoDto extends PartialType(CreateGanhoDto) {

    @ApiProperty({
        description: "Identificador do Produto a ser editado.",
        example: 1
    })
    idganho?: number;

    @ApiProperty({
        description: "Nome do motivo do ganho.",
        example: "Salário"
    })
    nomeProd?: number;

    @ApiProperty({
        description: "Valor que o usuário teve de lucro",
        example: 2300
    })
    valorGanho?: number;
}
