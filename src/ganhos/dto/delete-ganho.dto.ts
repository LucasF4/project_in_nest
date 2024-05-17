import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateGanhoDto } from './create-ganho.dto';

export class DeleteGanhoDto extends PartialType(CreateGanhoDto) {

    @ApiProperty({
        description: "Identificador do Gasto a ser editado",
        example: 1
    })
    @IsNumber()
    idganho: number;

}
