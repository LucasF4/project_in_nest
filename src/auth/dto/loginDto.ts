import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto{

    @ApiProperty({
        description: "E-mail do usuário",
        example: "admin@admin.com"
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "Senha do usuário",
        example: "admin@admin123"
    })
    @IsString()
    password: string;

}