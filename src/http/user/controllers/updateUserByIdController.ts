import { UserNotFoundError } from '@/services/errors/UserNotFoundError';
import { UpdateUserByIdService } from '@/services/user/updateUserByIdService';
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
      const user = await this.updateUserByIdService.execute({ id, ...data });
      return reply.status(200).send(user);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return reply.status(404).send({ message: error.message });
      }
      throw error;
    }
  }
}
