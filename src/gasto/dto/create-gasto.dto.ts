import { IsNumber, IsString } from "class-validator";
import { Gasto } from "../entities/gasto.entity";

export class CreateGastoDto extends Gasto {
    
    @IsNumber()
    valorGasto: number;

    @IsString()
    nameProd: string;
}
