import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();
    return user.isAdmin;
  }
}
