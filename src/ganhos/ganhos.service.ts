import { Injectable } from '@nestjs/common';
import { CreateGanhoDto } from './dto/create-ganho.dto';
import { User } from 'src/user/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateGanhoDto } from './dto/update-ganho.dto';
import { DeleteGanhoDto } from './dto/delete-ganho.dto';

@Injectable()
export class GanhosService {
  constructor(private prisma: PrismaService){}
  async create(createGanhoDto: CreateGanhoDto, user: User) {
    const data = {
      ...createGanhoDto,
      iduser: user.id
    }

    var createGanho = await this.prisma.ganhos.create({
      data
    })

    if(createGanho){
      return {msg: "Ganho Cadastrado"}
    }else{
      throw new Error("Erro ao cadastrar um ganho")
    }

  }

  async getGanhos(user: User){
    var returnAllG = await this.prisma.$queryRaw`SELECT * FROM ganhos WHERE iduser = ${user.id} ORDER BY createdAt ASC`;
    console.log(returnAllG)
    return {
      ganhos: returnAllG
    }
  }

  async editGanhos(updateGanhoDto: UpdateGanhoDto, user: User){
    const resultEditG = await this.prisma.gasto.updateMany({
      where: {
        iduser: user.id,
        idgasto: updateGanhoDto.idganho
      },
      data: {
        nameProd: updateGanhoDto.nomeProd,
        valorGasto: updateGanhoDto.valorGanho
      }
    })

    if(resultEditG.count == 1){
      return {
        msg: "Produto Atualizado com sucesso!"
      }
    }else{
      return {
        msg: "Produto não localizado"
      }
    }
  }
  
  async deleteGanho(deleteGasto: DeleteGanhoDto, user: User){
    var retur;
    await this.prisma.ganhos.delete({
      where: {
        idganho: deleteGasto.idganho,
        iduser: user.id
      }
    }).then( response => {
      console.log(response)
      retur = "Item deletado com sucesso!";
    }).catch( err => {
      console.log(err)
      retur = "O produto já foi deletado"
    })

    return {msg: retur}
  }
}
