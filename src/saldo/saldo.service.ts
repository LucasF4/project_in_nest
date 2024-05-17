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

    const valorGasto = await this.prisma.$queryRaw`
      SELECT SUM(valorGasto) as valorGasto FROM Gasto g
      WHERE iduser = ${user.id};
    `;

    const valorGanho = await this.prisma.$queryRaw`
      SELECT sum(valorGanho) as valorGanho FROM ganhos g WHERE iduser = ${user.id};
    `;

    const ultimasTransicoes = await this.prisma.$queryRaw`
      select valorGasto as valor, nameProd, createdAt, tipo from (
        select *, ('gasto') as tipo from Gasto g 
        where iduser = ${user.id}
        union all
        select *, ('ganho') as tipo from ganhos g2
        where iduser = ${user.id}
      ) as t
     order by createdAt ASC LIMIT 10;
    `;

    /* const prodGastos = await this.prisma.$queryRaw`
      SELECT g.nameProd, g.valorGasto FROM Gasto g
      WHERE g.iduser = ${user.id}
      ORDER BY createdAt ASC LIMIT 10;
    `; */

    const usuario = await this.prisma.$queryRaw`
      SELECT u.name, u.email, u.createdAt FROM Users u WHERE u.id = ${user.id}
    `;

    const info = await this.prisma.$queryRaw`
      SELECT u.name, s.valorInit FROM SaldoGasto sg 
      INNER JOIN Users u ON sg.iduser = u.id
      INNER JOIN Saldo s ON s.idsaldo = sg.idsaldo
      LEFT JOIN Gasto g ON g.iduser = u.id
      WHERE u.id = ${user.id}
      GROUP BY u.name, s.valorInit;
    `;

    console.log("Valor Ganho: ", valorGanho[0].valorGanho)
    console.log("Valor Gasto: ", valorGasto[0].valorGasto)
    console.log("Valor Inicial: ", info[0] == undefined ? 0 : info[0])
    var calc = (info[0] == undefined ? 0 : info[0].valorInit) + (valorGanho[0] == undefined || valorGanho[0].valorGanho == null ? 0 : parseInt(valorGanho[0].valorGanho)) - (valorGasto[0] == undefined ? 0 : valorGasto[0].valorGasto)
    console.log(calc)
    return {
      usuario: info[0] == undefined ? usuario : [info[0]],
      ultimasTransicoes,
      valorAt: calc ? calc : 0,
      valorGasto: valorGasto[0].valorGasto ? parseInt(valorGasto[0].valorGasto) : 0,
      valorGanho: valorGanho[0].valorGanho ? parseInt(valorGanho[0].valorGanho) : 0
    }
  }

  async delete(user: User){
    const retorno = await this.prisma.$executeRaw`
      DELETE SaldoGasto, Saldo FROM SaldoGasto 
      INNER JOIN Saldo ON SaldoGasto.idsaldo = Saldo.idsaldo 
      WHERE SaldoGasto.iduser = ${user.id};
    `

    if(retorno > 0){
      return {
        msg: 'Success',
        rowsAffected: retorno
      }
    }else{
      return{
        msg: "wrong",
        rowsAffected: retorno
      }
    }
  }
}
