import { InvalidateRefreshTokenService } from '@/services/refreshToken/invalidateToken';
import { handleError } from '@/utils/functions/handleError';
import { FastifyRequest, FastifyReply } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { refreshTokenCookieSchema } from '@/utils/schemas/auth/authSchema';

@injectable()
export class LogoutController {
  constructor(
    @inject('InvalidateRefreshTokenService')
    private invalidateRefreshTokenService: InvalidateRefreshTokenService
  ) {}

  async logout(request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify({ onlyCookie: true });

      const { refreshToken } = refreshTokenCookieSchema.parse(request.cookies);

      await this.invalidateRefreshTokenService.execute({ token: refreshToken });

      return reply
        .clearCookie('refreshToken', {
          path: '/',
          secure: true,
          sameSite: true,
          httpOnly: true,
        })
        .status(200)
        .send({ message: 'Logout successful' });
    } catch (error) {
      return handleError(reply, error);
    }
  }
}
