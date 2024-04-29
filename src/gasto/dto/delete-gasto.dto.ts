import { PartialType } from '@nestjs/mapped-types';
import { CreateGastoDto } from './create-gasto.dto';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteGastoDto extends PartialType(CreateGastoDto) {

    @ApiProperty({
        description: "Identificador do Gasto a ser editado",
        example: 1
    })
    @IsNumber()
    idgasto: number;

}
