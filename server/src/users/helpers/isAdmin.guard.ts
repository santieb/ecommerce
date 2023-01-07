import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class isAdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const { rawHeaders } = context.switchToHttp().getRequest();
    const token = rawHeaders[5].split(' ')[1];
    const decoded: any = this.jwtService.decode(token);

    return decoded.isAdmin === true;
  }
}
