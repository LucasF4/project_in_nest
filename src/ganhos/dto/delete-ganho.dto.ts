import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateGanhoDto } from "./create-ganho.dto";

export class DeleteGanho extends PartialType(CreateGanhoDto){

    @ApiProperty({
        description: "Identificador do Produto a ser deletado.",
        example: 1
    })
    idganho?: number;

}