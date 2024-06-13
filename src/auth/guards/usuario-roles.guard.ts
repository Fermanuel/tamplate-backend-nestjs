import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { Role } from '@prisma/client';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioRolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: Role[] = this.reflector.get<Role[]>(META_ROLES, context.getHandler());

    if (!validRoles || validRoles.length === 0) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const userRoles: Role[] = req.user.roles;

    if (!userRoles || userRoles.length === 0) {
      throw new ForbiddenException('Usuario sin roles asignados');
    }

    // Verificar si el usuario tiene al menos uno de los roles válidos
    const intersection = validRoles.some(role => userRoles.includes(role));
    
    if (intersection) {
      return true; // Usuario tiene al menos uno de los roles válidos
    } else {
      throw new ForbiddenException(`Necesitas tener rol de ${validRoles.join(', ')}`);
    }
  }
}
