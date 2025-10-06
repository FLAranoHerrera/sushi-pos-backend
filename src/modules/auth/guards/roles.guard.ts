import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../auth/decorators/roles.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user) throw new ForbiddenException('Usuario no autenticado');

    // Normalizamos a mayúsculas para coincidir con los roles del seeder
    const userRole = user.role?.toUpperCase();
    const allowed = requiredRoles.some((role) => role.toUpperCase() === userRole);

    if (!allowed) throw new ForbiddenException('No tienes permisos para acceder a esta ruta');
    return true;
  }
}
