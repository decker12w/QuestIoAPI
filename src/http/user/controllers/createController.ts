// http/user/controllers/createController.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserService } from '@/services/user/createUser';
import { UsernameAlreadyExistsError } from '@/services/errors/UsernameAlreadyExistsError';
import { inject, injectable } from 'tsyringe';
import { CreateUserInput } from '@/utils/schemas/user/userSchema';

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

      return reply.status(201).send(user);
    } catch (error) {
      if (error instanceof UsernameAlreadyExistsError) {
        return reply.status(409).send({
          statusCode: 409,
          errorCode: 'USERNAME_ALREADY_EXISTS',
          message: 'The username already exists.',
          details: error.message,
        });
      }
      throw error;
    }
  }
}
