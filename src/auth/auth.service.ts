import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService){}
    async validateUser(email:string, password:string){
        const user = await this.userService.findByEmail(email);

        if(user){
            var pswdCorrect = await bcrypt.compareSync(user.password, password)
            if(pswdCorrect){
                return {
                    ...user,
                    password: undefined
                }
            }
        }
        throw new Error("Credenciais de acesso inválida!")
    }
}
