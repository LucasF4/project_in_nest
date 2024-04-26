import { IsNumber } from "class-validator";
import { Saldo } from "../entities/saldo.entity";

export class CreateSaldoDto extends Saldo{

    @IsNumber()
    valorInit: number;

}
