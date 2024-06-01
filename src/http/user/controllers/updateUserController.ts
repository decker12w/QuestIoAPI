import { UserNotFoundError } from '@/services/errors/UserNotFoundError';
import { UpdateUserByIdService } from '@/services/user/updateUserByIdService';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

// Definir a interface para os parâmetros da rota

export class UpdateUserController {
  constructor(private updateUserByIdService: UpdateUserByIdService) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const updateBodySchema = z
      .object({
        fullname: z.string(),
        username: z.string(),
        password: z.string(),
        college_register: z.string(),
        user_role: z.enum(['USER', 'ADMIN', 'PROFESSOR']).optional(),
        account_status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
        xp_count: z.number().optional(),
      })
      .strict();

    const paramsSchema = z
      .object({
        id: z.string().transform(Number),
      })
      .strict();

    const {
      fullname,
      username,
      password,
      college_register,
      user_role,
      account_status,
      xp_count,
    } = updateBodySchema.parse(request.body);

    const { id } = paramsSchema.parse(request.params);

    try {
      await this.updateUserByIdService.execute({
        userId: id,
        fullname,
        username,
        password,
        college_register,
        user_role,
        account_status,
        xp_count,
      });
      return reply.status(204).send();
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return reply.status(404).send({ message: error.message });
      }
      throw error;
    }
  }
}
