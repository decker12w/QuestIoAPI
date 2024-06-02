import { UserNotFoundError } from '@/services/errors/UserNotFoundError';
import { DeleteUserByIdService } from '@/services/user/deleteUserByIdService';
import { ParamsIdInput, paramsIdSchema } from '@/utils/schemas/user/userSchema';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeleteUserByIdController {
  constructor(
    @inject('DeleteUserByIdService')
    private deleteUserByIdService: DeleteUserByIdService
  ) {}

  async handle(
    request: FastifyRequest<{ Params: ParamsIdInput }>,
    reply: FastifyReply
  ) {
    const { id } = paramsIdSchema.parse(request.params);

    try {
      await this.deleteUserByIdService.execute({ id });
      return reply.status(204).send();
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return reply.status(404).send({ message: error.message });
      }
      throw error;
    }
  }
}
