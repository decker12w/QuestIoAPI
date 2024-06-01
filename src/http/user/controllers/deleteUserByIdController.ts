import { UserNotFoundError } from '@/services/errors/UserNotFoundError';
import { DeleteUserByIdService } from '@/services/user/deleteUserByIdService';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

@injectable()
export class DeleteUserByIdController {
  constructor(
    @inject('DeleteUserByIdService')
    private deleteUserByIdService: DeleteUserByIdService
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const deleteUserByIdParamsSchema = z.object({
      id: z.string().transform(Number),
    });

    const { id } = deleteUserByIdParamsSchema.parse(request.params);

    try {
      await this.deleteUserByIdService.execute({ userId: id });
      return reply.status(204).send();
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return reply.status(404).send({ message: error.message });
      }
      throw error;
    }
  }
}
