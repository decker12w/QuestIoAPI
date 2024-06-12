import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterUserService } from '@/services/user/registerUser';
import { inject, injectable } from 'tsyringe';
import { CreateUserInput, UserOutput } from '@/utils/schemas/user/userSchema';
import { handleError } from '@/utils/functions/handleError';

@injectable()
export class RegisterUserController {
  constructor(
    @inject('RegisterUserService')
    private registerUserService: RegisterUserService
  ) {}

  async handle(
    request: FastifyRequest<{ Body: CreateUserInput }>,
    reply: FastifyReply
  ) {
    const data = request.body;

    try {
      const user = await this.registerUserService.execute(data);
      return this.created(reply, user);
    } catch (error) {
      return handleError(reply, error);
    }
  }

  private async created(reply: FastifyReply, user: UserOutput) {
    return reply.status(201).send(user);
  }
}
