import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entities';
import { UserPaylad } from './models/UserPaylooad';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService){}

    login(user: User){
        const payload:UserPaylad = {
            sub: user.id,
            email: user.email,
            name: user.name
        }

        const jwtToken = this.jwtService.sign(payload);
        
        return {
            jwtToken
        }
    }


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