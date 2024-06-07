import { UpdateUserByIdService } from '@/services/user/updateUserById';
import { handleError } from '@/utils/functions/handleError';
import {
  ParamsIdInput,
  UpdateUserInput,
  paramsIdSchema,
} from '@/utils/schemas/user/userSchema';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';

// Definir a interface para os parâmetros da rota
@injectable()
export class UpdateUserByIdController {
  constructor(
    @inject('UpdateUserByIdService')
    private updateUserByIdService: UpdateUserByIdService
  ) {}

  async handle(
    request: FastifyRequest<{
      Body: UpdateUserInput;
      Params: ParamsIdInput;
    }>,
    reply: FastifyReply
  ) {
    const data = request.body;

    const { id } = paramsIdSchema.parse(request.params);

    try {
      await this.updated(reply, data, id);
    } catch (error) {
      handleError(reply, error);
    }
  }

  private async updated(
    reply: FastifyReply,
    userData: UpdateUserInput,
    userId: number
  ) {
    await this.updateUserByIdService.execute({
      id: userId,
      ...userData,
    });
    return reply.status(204).send();
  }
}
