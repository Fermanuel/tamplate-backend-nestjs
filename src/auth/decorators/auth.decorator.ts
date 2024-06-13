import { UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from '@prisma/client';
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import {UsuarioRolesGuard } from '../guards/usuario-roles.guard'

export function Auth(...roles: Role[]) {

  return applyDecorators(
    
    RoleProtected(...roles),
    UseGuards( AuthGuard(), UsuarioRolesGuard ),

  );
}