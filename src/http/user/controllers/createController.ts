import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserService } from '@/services/user/createUser';
import { inject, injectable } from 'tsyringe';
import { CreateUserInput, UserOutput } from '@/utils/schemas/user/userSchema';
import { handleError } from '@/utils/functions/handleError';

@injectable()
export class CreateUserController {
  constructor(
    @inject('CreateUserService') private createUserService: CreateUserService
  ) {}

  async handle(
    request: FastifyRequest<{ Body: CreateUserInput }>,
    reply: FastifyReply
  ) {
    const data = request.body;

    try {
      const user = await this.createUserService.execute(data);
      return this.created(reply, user);
    } catch (error) {
      return handleError(reply, error);
    }
  }

  private created(reply: FastifyReply, user: UserOutput) {
    return reply.status(201).send(user);
  }
}
