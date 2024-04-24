import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}
    async validatorUser(email: string, password: string){

        const user = await this.prisma.users.findUnique({
            where: {
                email
            }
        });

        if(user){
            const pwsdValid = await bcrypt.compareSync(password, user.password)
            if(pwsdValid){
                return {
                    ...user,
                    password: undefined
                }
            }
        }

        throw new Error('Email Address or password provided is incorrect.')
    }
}