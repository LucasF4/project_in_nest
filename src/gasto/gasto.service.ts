import { Injectable } from '@nestjs/common';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { User } from 'src/user/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GastoService {
  constructor(private prisma: PrismaService){}
  async create(createGastoDto: CreateGastoDto, user: User) {
    const data = {
      ...createGastoDto,
      iduser: user.id
    }

    var creategasto = await this.prisma.gasto.create({
      data
    })

    if(creategasto){
      return {msg: "Gasto Cadastrado"}
    }else{
      throw new Error("Erro ao cadastrar gasto")
    }
  }

  async getAllGastos(){
    const response = await this.prisma.$queryRaw`SELECT * FROM gasto`;

    return {...response[0]}
  }
}
