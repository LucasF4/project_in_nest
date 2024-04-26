import { Injectable } from '@nestjs/common';
import { CreateSaldogastoDto } from './dto/create-saldogasto.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SaldogastoService {
  constructor(private prisma: PrismaService){}
  
  async create(userid: string, idsaldo: number){

    let response = ''
    const data = {
      idsaldo: idsaldo,
      iduser: userid
    }

    await this.prisma.saldoGasto.create({
      data
    })
    .then(result => {
      console.log(result)
      response = 'Inserido com sucesso!'
    })
    .catch(e => {
      console.log(e)
      throw new Error("Erro ao inserir suas informações")
    })

    return {response: response};
  }
}
