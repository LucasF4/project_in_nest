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

    let saldogastos;

    await this.prisma.saldo.create({
      data,
      
    })
    .then(async result => {
      console.log(result.idsaldo)
      saldogastos = await this.saldogastoService.create(user.id, result.idsaldo)
    })
    .catch(() => {
      throw new Error("Error ao Inserir Saldo.")
    })

    return saldogastos;
  }

  async getSaldo(user: User) {
    console.log(user.id)

    const info = await this.prisma.$queryRaw`SELECT s.valorInit, u.name, g.valorGasto, g.nameProd, CAST((s.valorInit - SUM(g.valorGasto)) as char) as valorAt  FROM saldogasto sg INNER JOIN saldo s ON s.idsaldo = sg.idsaldo INNER JOIN users u ON sg.iduser = u.id INNER JOIN gasto g ON g.iduser = u.id;`;

    return {
      user_info: {
        usuario: {
          name: info[0].name
        },
        gastos: {
          valorGasto: info[0].valorGasto,
          nameProd: info[0].nameProd
        },
        valores: {
          valorInit: info[0].valorInit,
          valorAt: parseInt(info[0].valorAt)
        }
      }
    }
  }
}
