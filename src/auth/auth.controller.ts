import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateAuthDto } from './dto/update-usuario.dto';
import { LoginUserDto } from './dto/login-usuario.dto';

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


  // TODO: Anlizar si se debe mantener estos endpoint
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
