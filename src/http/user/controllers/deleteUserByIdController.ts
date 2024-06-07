import { DeleteUserByIdService } from '@/services/user/deleteUserByIdService';
import { handleError } from '@/utils/functions/handleError';
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
      this.deleted(reply, id);
    } catch (error) {
      return handleError(reply, error);
    }
  }

  private async deleted(reply: FastifyReply, id: number) {
    await this.deleteUserByIdService.execute({ id });
    return reply.status(204).send();
  }
}
