import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const rpcContext = context.switchToRpc();
    const metadata = rpcContext.getContext().metadata;

    const authHeader = metadata.get('authorization')?.[0];

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    rpcContext.getData().headers = { authorization: `Bearer ${token}` };

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
