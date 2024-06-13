import { IsEmail, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";


export class CreateUsuarioDto {

    @IsString()
    @IsEmail()
    @MaxLength(30)
    email: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    userName: string;

    @IsString()
    apellido: string;
  
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @IsStrongPassword()
    password: string;
}
