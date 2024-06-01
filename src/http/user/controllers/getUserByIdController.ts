import { UserNotFoundError } from '@/services/errors/UserNotFoundError';
import { GetUserByIdService } from '@/services/user/getUserById';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

@injectable()
export class GetUserByIdController {
  constructor(
    @inject('GetUserByIdService') private getUserByIdService: GetUserByIdService
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const findUserByIdParamsSchema = z.object({
      id: z.string().transform(Number),
    });

    const { id } = findUserByIdParamsSchema.parse(request.params);

    try {
      const user = await this.getUserByIdService.execute({ userId: id });
      return reply.status(200).send({ user });
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return reply.status(404).send({ message: error.message });
      }
      throw error;
    }
  }
}
