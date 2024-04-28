import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { User } from "../entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto extends User {

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
    @MinLength(4)
    @MaxLength(20)
    password: string;

    @ApiProperty({
        description: "Nome do usuário",
        example: "admin"
    })
    @IsString()
    name: string;

}
