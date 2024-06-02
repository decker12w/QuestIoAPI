import { UserNotFoundError } from '@/services/errors/UserNotFoundError';
import { GetUserByIdService } from '@/services/user/getUserById';
import { ParamsIdInput, paramsIdSchema } from '@/utils/schemas/user/userSchema';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetUserByIdController {
  constructor(
    @inject('GetUserByIdService') private getUserByIdService: GetUserByIdService
  ) {}

  async handle(
    request: FastifyRequest<{ Params: ParamsIdInput }>,
    reply: FastifyReply
  ) {
    const { id } = paramsIdSchema.parse(request.params);

    try {
      const user = await this.getUserByIdService.execute({ id });
      return reply.status(200).send(user);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return reply.status(404).send({ message: error.message });
      }
      throw error;
    }
  }
}
