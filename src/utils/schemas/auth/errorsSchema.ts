import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const errorCore = {
  message: z.string({
    required_error: 'Message is required.',
    invalid_type_error: 'Message must be a string.',
  }),
  statusCode: z.number({
    required_error: 'Status code is required.',
    invalid_type_error: 'Status code must be a number.',
  }),
  errorCode: z.string({
    required_error: 'Error code is required.',
    invalid_type_error: 'Error code must be a string.',
  }),
  details: z.string().optional(),
};

const NoCookieErrorSchema = z.object({
  ...errorCore,
  statusCode: z.literal(401),
  errorCode: z.literal('NO_COOKIE_TOKEN'),
  message: z.literal('No cookie error.'),
});

export const { schemas: errorsSchemas, $ref: $errorsRef } = buildJsonSchemas(
  {
    NoCookieErrorSchema,
  },
  { $id: 'errorsSchemas' }
);
