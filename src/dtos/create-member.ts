import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateMember {
    @IsNotEmpty()
    @Length(5, 100)
    name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}