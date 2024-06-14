import { UpdateRefreshTokenService } from '@/services/refreshToken/updateRefreshToken';
import { VerifyRefreshTokenService } from '@/services/refreshToken/verifyToken';
import { handleError } from '@/utils/functions/handleError';
import { refreshTokenCookieSchema } from '@/utils/schemas/auth/authSchema';
import { FastifyRequest, FastifyReply } from 'fastify';
import { inject, injectable } from 'tsyringe';

@injectable()
export class RefreshTokenController {
  constructor(
    @inject('VerifyRefreshTokenService')
    private verifyRefreshTokenService: VerifyRefreshTokenService,
    @inject('UpdateRefreshTokenService')
    private updateRefreshTokenService: UpdateRefreshTokenService
  ) {}

  async refresh(request: FastifyRequest, reply: FastifyReply) {
    try {
      // Verifica o refresh token presente nos cookies
      await request.jwtVerify({ onlyCookie: true });

      // Pega o refresh token do cookie

      const { refreshToken: oldRefreshToken } = refreshTokenCookieSchema.parse(
        request.cookies
      );

      // Verifica se o refresh token é válido
      const savedToken = await this.verifyRefreshTokenService.execute({
        token: oldRefreshToken,
      });

      // Gera um novo access token
      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: savedToken.userId.toString(),
          },
        }
      );

      // Gera um novo refresh token
      const newRefreshToken = await reply.jwtSign(
        {},
        {
          sign: {
            sub: savedToken.userId.toString(),
            expiresIn: '7d',
          },
        }
      );

      // Atualiza o refresh token no repositório
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await this.updateRefreshTokenService.execute({
        oldToken: oldRefreshToken,
        newToken: newRefreshToken,
        newExpiresAt: expiresAt,
      });

      // Envia os novos tokens na resposta
      return reply
        .setCookie('refreshToken', newRefreshToken, {
          path: '/',
          secure: true,
          sameSite: true,
          httpOnly: true,
        })
        .status(200)
        .send({ token });
    } catch (error) {
      return handleError(reply, error);
    }
  }
}
