import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    var user = await this.userService.create(createUserDto);
    res.status(user.status).json({msg: user.msg})
  }

}
