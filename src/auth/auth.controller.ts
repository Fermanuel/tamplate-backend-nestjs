import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginUserDto } from './dto/login-usuario.dto';
import { Auth } from './decorators/auth.decorator';
import { Role, User } from '@prisma/client';
import { GetUser } from './decorators/get-user.decorator';


@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}

  // solo el administrador puede registrar usuarios
  @Auth(Role.ADMINISTRADOR)
  @Post('registro')
  createUser(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.authService.create(createUsuarioDto);
  }

  @Post('login')
  login(@Body() loginUserDto : LoginUserDto ) {
    return this.authService.login(loginUserDto);
  }

  // REFRESH TOKEN
  @Get('check-status-user')
  @Auth(Role.USUARIO, Role.ADMINISTRADOR)
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus(user);
  }


  // ENDPOINT DE PRUEBA DE AUTENTICACIÓN

  @Get('prueba')
  @Auth(Role.ADMINISTRADOR)
  todosUsuarios(@GetUser() user: User  ){
    return {
      Ok: true,
      user
    }
  }
}
