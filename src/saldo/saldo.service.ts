import { Injectable } from '@nestjs/common';
import { CreateSaldoDto } from './dto/create-saldo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { SaldogastoService } from 'src/saldogasto/saldogasto.service';

@Injectable()
export class SaldoService {
  constructor(private prisma: PrismaService, private saldogastoService: SaldogastoService){}

  async create(createSaldoDto: CreateSaldoDto, user: User){
    const data = {
      ...createSaldoDto
    }

    let saldogasto;

    await this.prisma.saldo.create({
      data,
      
    })
    .then(async result => {
      console.log(result.idsaldo)
      saldogasto = await this.saldogastoService.create(user.id, result.idsaldo)
    })
    .catch(() => {
      throw new Error("Error ao Inserir Saldo.")
    })

    return saldogasto;
  }

  async getSaldo(user: User) {
    console.log(user.id)
    const saldo = await this.prisma.saldo.findMany({
      select: {
        valorInit: true,
      }
    })

    return {
      ...saldo,
      idsaldo: undefined
    }
  }
}
