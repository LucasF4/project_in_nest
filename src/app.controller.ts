import { Body, Controller, Get, HttpStatus, Post, Res, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { randomUUID } from 'crypto';
import { CreateMember, LoginUser } from './dtos/create-member';
import { Response } from 'express';
import { GetParams } from './dtos/getParam';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AuthRequest } from './auth/models/AuthRequest';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService, private readonly authService: AuthService) {}

  //READ DATA
  @Get('member')
  async getMember(){
    const member = await this.prisma.users.findMany()
    return {members: member};
  }

  //GET DATA USER LOGIN
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthRequest){
    console.log(req.user)

    return this.authService.login(req.user)

  }

  //CREATE DATA USER
  @Post('member')
  async createMember(@Body() body: CreateMember, @Res() res: Response) {
    const {email, password } = body;

    const data = {
      id: randomUUID(),
      ...body,
      password: await bcrypt.hash(password, 10)
    }

    const memberExist = await this.prisma.users.findUnique({
      where: {
        email
      }
    })
    if(memberExist == null){
      await this.prisma.users.create({
        data
      }).then(() => {
        return res.status(HttpStatus.CREATED).json({message: 'User Created'});
      })
    }else{
      res.status(HttpStatus.BAD_REQUEST).json([{message: "This Email exist!"}]);
    }

  }

  //DELETE DATA USER
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
