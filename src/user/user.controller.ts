import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('users')
  @IsPublic()
  @Post('user')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    var user = await this.userService.create(createUserDto);
    res.status(user.status).json({msg: user.msg})
  }

}
