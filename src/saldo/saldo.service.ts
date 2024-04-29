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

    const valorGasto = await this.prisma.$queryRaw`
      SELECT SUM(valorGasto) as valorGasto FROM Gasto g
      WHERE iduser = ${user.id};
    `;

    const prodGastos = await this.prisma.$queryRaw`
      SELECT g.nameProd, g.valorGasto FROM Gasto g
      WHERE g.iduser = ${user.id}
      ORDER BY createdAt ASC LIMIT 10;
    `;

    const info = await this.prisma.$queryRaw`
      SELECT u.name, s.valorInit FROM SaldoGasto sg 
      INNER JOIN Users u ON sg.iduser = u.id
      INNER JOIN Saldo s ON s.idsaldo = sg.idsaldo
      LEFT JOIN Gasto g ON g.iduser = u.id
      WHERE g.iduser = ${user.id}
      GROUP BY u.name, s.valorInit;
    `;

    console.log(info)
    console.log(valorGasto)

    return {
      ...info[0],
      prodGastos,
      valorAt: info[0].valorInit - valorGasto[0].valorGasto
    }
  }
}
