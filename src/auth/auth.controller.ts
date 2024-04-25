import { Controller, HttpCode, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';


@Controller()
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(@Request() req){
        console.log(process.env.SECRET)
        console.log(req.user)
        return this.authService.login(req.user)
    }
}
