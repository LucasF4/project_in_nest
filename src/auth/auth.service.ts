import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    async validateUser(email:string, password:string){
        //Tratamento de validação de senha e email do usuário
    }
}
