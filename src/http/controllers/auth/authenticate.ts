import { AuthenticateService } from '@/services/auth/authenticate';
import { CreateRefreshTokenService } from '@/services/refreshToken/createToken';
import { handleError } from '@/utils/functions/handleError';
import {
  AuthenticateInput,
  authenticateInputSchema,
} from '@/utils/schemas/user/userSchema';
import { FastifyRequest, FastifyReply } from 'fastify';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AuthenticateController {
  constructor(
    @inject('AuthenticateService')
    private authenticateService: AuthenticateService,
    @inject('CreateRefreshTokenService')
    private createRefreshTokenService: CreateRefreshTokenService
  ) {}

  async authenticate(
    request: FastifyRequest<{ Body: AuthenticateInput }>,
    reply: FastifyReply
  ) {
    const { email, password } = authenticateInputSchema.parse(request.body);

    try {
      const user = await this.authenticateService.execute({ email, password });

      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: user.id.toString(),
          },
        }
      );

      const refreshToken = await reply.jwtSign(
        {},
        {
          sign: {
            sub: user.id.toString(),
            expiresIn: '7d',
          },
        }
      );

      this.createRefreshTokenService.execute({
        userId: user.id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      return reply
        .setCookie('refreshToken', refreshToken, {
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
