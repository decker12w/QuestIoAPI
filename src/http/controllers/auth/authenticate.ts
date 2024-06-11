import { AuthenticateService } from '@/services/user/authenticate';
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
    private authenticateService: AuthenticateService
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

      return reply.status(200).send({ token });
    } catch (error) {
      return handleError(reply, error);
    }
  }
}
