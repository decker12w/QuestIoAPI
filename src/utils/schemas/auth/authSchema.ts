import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

export const userCore = {
  password: z.string({
    required_error: 'Password is required.',
    invalid_type_error: 'Password must be a string.',
  }),
  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string',
  }),
};

export const authenticateInputSchema = z
  .object({
    ...userCore,
  })
  .strict();

export const refreshTokenCookieSchema = z.object({ refreshToken: z.string() });

export const logoutOutputSchema = z.object({
  message: z.string(),
});

export type AuthenticateInput = z.infer<typeof authenticateInputSchema>;
export type RefreshTokenCookie = z.infer<typeof refreshTokenCookieSchema>;

export const { schemas: authSchemas, $ref: $authRef } = buildJsonSchemas(
  {
    authenticateInputSchema,
    refreshTokenCookieSchema,
    logoutOutputSchema,
  },
  { $id: 'authSchemas' }
);
