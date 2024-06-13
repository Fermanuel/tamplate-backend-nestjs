import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginUserDto } from './dto/login-usuario.dto';
import { DbService } from 'src/db/db.service';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-paylot.interface';

@Injectable()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);

  constructor (
    private readonly dbService: DbService,
    private readonly jwtService: JwtService
  ) {
  }

  todosUsuarios() {
    return 'Todos los usuarios'
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const { email, password, ...rest } = createUsuarioDto;
  
      // Verificar si el usuario ya existe en la base de datos
      const existingUser = await this.dbService.user.findUnique({
        where: {
          email
        }
      });
  
      if (existingUser) {
        throw new BadRequestException('Este Usuario ya existe, intente de nuevo');
      }
  
      // Crear nuevo usuario
      const newUser = await this.dbService.user.create({
        data: {
          email,
          password: bcrypt.hashSync(password, 10),
          ...rest
        }
      });
  
      // Excluir el campo password del resultado
      const { password: _, ...user } = newUser;
  
      return {
        data: user,
        token: this.getJwtToken({ id: newUser.id }),
      };
  
    } catch (error) {

      this.logger.error(error);
      this.handleDBError(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {

    try {

      const { email, password } = loginUserDto;

      // Buscar usuario en la base de datos
      const user = await this.dbService.user.findUnique({
        where: {
          email
        },
        select: {
          id: true,
          email: true,
          password: true,
          userName: true,
          apellido: true,
          roles: true,
          IsActive: true
        }
      });

      if (!user) {
        throw new BadRequestException('Usuario no encontrado');
      }

      // Verificar la contraseña
      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (!passwordMatch) {
        throw new BadRequestException('Contraseña incorrecta');
      }

      // Excluir el campo password del resultado
      const { password: _, ...userData } = user;

      return {
        data: userData,
        token: this.getJwtToken({ id: user.id }),
      };


    } catch (error) {

      this.logger.error(error);
      this.handleDBError(error);

    }
  }
  
  //* GENERACION DE TOKEN
  private getJwtToken( payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  // metodo para manejar los errores
  private handleDBError(error: any): never {
    
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('Error en la base de datos');
  }
}
