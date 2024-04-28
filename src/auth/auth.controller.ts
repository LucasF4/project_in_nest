import { Body, Controller, HttpCode, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IsPublic } from './decorators/is-public.decorator';
import { LoginDto } from './dto/loginDto';
import { ApiTags } from '@nestjs/swagger';


@Controller()
export class AuthController {
    constructor(private authService: AuthService){}

    @IsPublic()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @ApiTags('login')
    login(@Body() loginDto: LoginDto, @Request() req){
        //dto apenas para importação no swagger
        return this.authService.login(req.user)
    }
}
