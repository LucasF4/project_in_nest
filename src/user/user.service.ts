import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService){}

  async create(createUserDto: CreateUserDto) {
    const data = {
      id: randomUUID(),
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    }

    var existUser = await this.prisma.users.findUnique({
      where: {
        email: createUserDto.email
      }
    })

    if(existUser){
      return {msg: "Email já cadastrado", status: HttpStatus.BAD_REQUEST};
    }else{
      const createdUser = await this.prisma.users.create({
        data
      })
  
      return {
        msg: {
          id: undefined,
          ...createdUser,
          password: undefined
        },
        status: HttpStatus.CREATED
      }
    }
  }

  findByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: {email}
    })
  }
}
