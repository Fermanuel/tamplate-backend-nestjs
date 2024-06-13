import { Reflector } from "@nestjs/core";
import { META_ROLES } from "../decorators/role-protected.decorator";
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Observable } from "rxjs";


export class UsuarioRolesGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
    ) { }

    canActivate(
        context: ExecutionContext,
      ): boolean | Promise<boolean> | Observable<boolean> {
    
        const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler() )
    
    
        if(!validRoles) {
          return true;
        }
    
        if(validRoles.length === 0) {
          return true;
        }
    
        const req = context.switchToHttp().getRequest();
        const user = req.user;
    
    
        if(!user) {
          throw new BadRequestException('Usuario no encontrado')
        }
    
        for (const role of user.roles) {
          if (validRoles.includes(role)) {
            return true;
          }
        }
    
        throw new ForbiddenException(
          `${user.nombre} necesitas ser ${validRoles} para acceder a esta ruta`
        );
      }
}