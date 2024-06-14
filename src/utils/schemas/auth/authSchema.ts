import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

export const refreshTokenCookieSchema = z.object({ refreshToken: z.string() });

export type RefreshTokenCookie = z.infer<typeof refreshTokenCookieSchema>;
export const { schemas: authSchemas, $ref } = buildJsonSchemas(
  {
    refreshTokenCookieSchema,
  },
  { $id: 'authSchemas' }
);
