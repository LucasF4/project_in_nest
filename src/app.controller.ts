import { Body, Controller, Get, HttpStatus, Post, Res, Delete, Query, Param } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { randomUUID } from 'crypto';
import { CreateMember } from './dtos/create-member';
import { Response } from 'express';
import { GetParams } from './dtos/getParam';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  //READ DATA
  @Get('member')
  async getMember(){
    const member = await this.prisma.users.findMany()
    return {members: member};
  }

  //CREATE DATA
  @Post('member')
  async createMember(@Body() body: CreateMember, @Res() res: Response) {
    const {name, email, password } = body;
    const memberExist = await this.prisma.users.findUnique({
      where: {
        email
      }
    })
    if(memberExist == null){
      await this.prisma.users.create({
        data: {
          id: randomUUID(),
          name,
          email,
          password
        }
      })
      return {message: 'User Created'};
    }

    res.status(HttpStatus.BAD_REQUEST).json([{message: "This Email exist!"}]);
  }

  //DELETE DATA
  @Delete('member')
  async deleteMember(@Query() queryParams: GetParams, @Res() res: Response){
    console.log(queryParams.uuid)
    await this.prisma.users.delete({
      where: {
        id: queryParams.uuid
      }
    }).then(() => {
      res.status(HttpStatus.OK).json([{message: "User Deleted with success!"}])
    }).catch(e => {
      res.status(HttpStatus.BAD_REQUEST).json([{message: "Error Deleted Member!", error: e}])
    })
  }
}
