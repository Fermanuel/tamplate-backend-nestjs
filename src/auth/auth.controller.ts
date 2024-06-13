import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginUserDto } from './dto/login-usuario.dto';
import { Auth } from './decorators/auth.decorator';
import { Role } from '@prisma/client';


@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}

  @Post('registro')
  createUser(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.authService.create(createUsuarioDto);
  }

  @Post('login')
  login(@Body() loginUserDto : LoginUserDto ) {
    return this.authService.login(loginUserDto);
  }


  // ENDPOINT DE PRUEBA DE AUTENTICACIÓN

  @Get('prueba')
  @Auth(Role.ADMINISTRADOR)
  todosUsuarios() {
    return this.authService.todosUsuarios();
  }
}
