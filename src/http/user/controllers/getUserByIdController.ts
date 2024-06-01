import { UserNotFoundError } from '@/services/errors/UserNotFoundError';
import { FindUserByIdService } from '@/services/user/findUserById';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export class GetUserByIdController {
  constructor(private findUserByIdService: FindUserByIdService) {
    console.log('FindUserByIdService injected:', findUserByIdService);
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const findUserByIdParamsSchema = z.object({
      id: z.string().transform(Number),
    });

    const { id } = findUserByIdParamsSchema.parse(request.params);

    try {
      const user = await this.findUserByIdService.execute({ userId: id });
      return reply.status(200).send({ user });
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return reply.status(404).send({ message: error.message });
      }
      throw error;
    }
  }
}
