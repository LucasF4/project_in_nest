import { Injectable } from '@nestjs/common';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { User } from 'src/user/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteGastoDto } from './dto/delete-gasto.dto';

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

  async getAllGastos(user: User){
    const response = await this.prisma.$queryRaw`SELECT * FROM Gasto WHERE iduser = ${user.id} ORDER BY createdAt DESC`;
    console.log(response)
    return {
      gastos: response
    }
  }

  async updateGasto(updateGasto: UpdateGastoDto, user: User){
    
    const response = await this.prisma.gasto.updateMany({
      where: {
        iduser: user.id,
        idgasto: updateGasto.idgasto
      },
      data: {
        nameProd: updateGasto.nameProd,
        valorGasto: updateGasto.valorGasto
      }
    })

    console.log(response)

    if(response.count == 1){
      return {
        msg: "Produto Atualizado com sucesso!"
      }
    }else{
      return {
        msg: "Produto não localizado"
      }
    }

  }

  async deleteGasto(deleteGasto: DeleteGastoDto, user: User){
    var retur;
    await this.prisma.gasto.delete({
      where: {
        idgasto: deleteGasto.idgasto,
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
