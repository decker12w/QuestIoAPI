import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

export const refreshTokenCore = {
  userId: z.number(),
  token: z.string(),
  expiresAt: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
};

export const refreshTokenInputSchema = z
  .object({ ...refreshTokenCore })
  .strict();

export const tokenInputSchema = z.object({ token: z.string() }).strict();

export const refreshTokenOutputSchema = z
  .object({ id: z.number(), ...refreshTokenCore })
  .strict();

export const updateTokenInputSchema = z.object({
  oldToken: z.string(),
  newToken: z.string(),
  newExpiresAt: z.date(),
});

export type UpdateTokenInput = z.infer<typeof updateTokenInputSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenInputSchema>;
export type TokenInput = z.infer<typeof tokenInputSchema>;
export type RefreshTokenOutput = z.infer<typeof refreshTokenOutputSchema>;
export const { schemas: refreshTokenSchemas, $ref } = buildJsonSchemas(
  {
    updateTokenInputSchema,
    tokenInputSchema,
    refreshTokenInputSchema,
    refreshTokenOutputSchema,
  },
  { $id: 'refreshTokenSchemas' }
);
