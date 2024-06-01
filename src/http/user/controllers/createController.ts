// http/user/controllers/createController.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { CreateUserService } from '@/services/user/createUser';
import { UsernameAlreadyExistsError } from '@/services/errors/UsernameAlreadyExistsError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateUserController {
  constructor(
    @inject('CreateUserService') private createUserService: CreateUserService
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createUserBodySchema = z
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

    const {
      fullname,
      username,
      password,
      college_register,
      user_role,
      account_status,
    } = createUserBodySchema.parse(request.body);

    try {
      const { user } = await this.createUserService.execute({
        fullname,
        username,
        password,
        college_register,
        user_role,
        account_status,
      });
      return reply.status(201).send({ user });
    } catch (error) {
      if (error instanceof UsernameAlreadyExistsError) {
        return reply.status(409).send({ message: error.message });
      }
      throw error;
    }
  }
}
