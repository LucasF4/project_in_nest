import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService){}
    async validateUser(email:string, password:string){
        const user = await this.userService.findByEmail(email);

        if(user){
            var pswdCorrect = await bcrypt.compareSync(password, user.password)
            if(pswdCorrect){
                return {
                    ...user,
                    password: undefined
                }
            }
        }
        throw new Error("Credenciais de acesso inválida!")
    }

    login(user: User){
        const payload = {
            "sub"  : user.id,
            "email": user.email,
            "name" : user.name
        }

        const jwtToken = this.jwtService.sign(payload);

        return {
            access_token: jwtToken
        }
    }
}
