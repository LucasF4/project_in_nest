import { IsNumber, IsString } from "class-validator";
import { Saldogasto } from "../entities/saldogasto.entity";

export class CreateSaldogastoDto extends Saldogasto {

    @IsNumber()
    idgasto: number;

    @IsNumber()
    idsaldo: number;

    @IsString()
    iduser: string;

}
