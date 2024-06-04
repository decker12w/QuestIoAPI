import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

export const userCore = {
  fullname: z.string({
    required_error: 'Fullname is required.',
    invalid_type_error: 'Fullname must be a string.',
  }),
  username: z.string({
    required_error: 'Username is required.',
    invalid_type_error: 'Username must be a string.',
  }),
  email:z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string'
  }),
  password: z.string({
    required_error: 'Password is required.',
    invalid_type_error: 'Password must be a string.',
  }),
  college_register: z.string({
    required_error: 'College register is required.',
    invalid_type_error: 'College register must be a string.',
  }),
  user_role: z.enum(['USER', 'ADMIN', 'PROFESSOR']).optional(),
  account_status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
};

export const createUserBodySchema = z.object({ ...userCore }).strict();

export const updateUserBodySchema = z
  .object({ xp_count: z.number(), ...userCore })
  .strict();

export const updateUserService = z
  .object({ id: z.number(), xp_count: z.number(), ...userCore })
  .strict();

export const UserResponseSchema = z
  .object({
    id: z.number(),
    xp_count: z.number(),
    ...userCore,
  })
  .strict();

export const paramsIdSchema = z
  .object({
    id: z.string().transform(Number),
  })
  .strict();

export type CreateUserInput = z.infer<typeof createUserBodySchema>;
export type UserOutput = z.infer<typeof UserResponseSchema>;
export type ParamsIdInput = z.infer<typeof paramsIdSchema>;
export type UpdateUserInput = z.infer<typeof updateUserBodySchema>;
export type UpdateUserService = z.infer<typeof updateUserService>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    createUserBodySchema,
    UserResponseSchema,
    paramsIdSchema,
    updateUserBodySchema,
    updateUserService,
  },
  { $id: 'userSchemas' }
);
