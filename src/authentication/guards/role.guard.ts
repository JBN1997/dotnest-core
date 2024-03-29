import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
   constructor(private readonly reflector: Reflector) {}

   canActivate(context: ExecutionContext): boolean {
      const roles = this.reflector.getAllAndMerge<string[]>('roles', [
         context.getHandler(),
         context.getClass(),
      ]);
      if (!roles) return true;

      const request = context.switchToHttp().getRequest();
      const user = request.user;

      if (!user) return false;

      const hasRole = roles.includes(user.role);

      return user && user.role && hasRole;
   }
}
