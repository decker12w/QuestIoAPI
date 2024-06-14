import { GetUserByIdService } from '@/services/user/getUserById';
import { handleError } from '@/utils/functions/handleError';
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
      await this.found(reply, id);
    } catch (error) {
      handleError(reply, error);
    }
  }

  private async found(reply: FastifyReply, id: number) {
    const user = await this.getUserByIdService.execute({ id });
    return reply.status(200).send(user);
  }
}
