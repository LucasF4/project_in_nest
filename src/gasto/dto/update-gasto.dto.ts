import { PartialType } from '@nestjs/mapped-types';
import { CreateGastoDto } from './create-gasto.dto';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGastoDto extends PartialType(CreateGastoDto) {

    @ApiProperty({
        description: "Identificador do Gasto a ser editado",
        example: 1
    })
    @IsNumber()
    idgasto: number;

    @ApiProperty({
        description: "Atualizar Valor do Gasto do Usuário",
        example: 800
    })
    @IsNumber()
    valorGasto?: number;

    @ApiProperty({
        description: "Atualizar Nome do Produto do Usuário",
        example: "Café"
    })
    @IsString()
    nameProd?: string;

}
