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

const NameAlreadyExistsErrorSchema = z.object({
  ...errorCore,
  statusCode: z.literal(409),
  errorCode: z.literal('NAME_ALREADY_EXISTS'),
  message: z.literal('The name already exists.'),
});

const CourseNotFoundErrorSchema = z.object({
  ...errorCore,
  statusCode: z.literal(404),
  errorCode: z.literal('COURSE_NOT_FOUND'),
  message: z.literal('Course not found.'),
});

const ValidationErrorSchema = z.object({
  ...errorCore,
  statusCode: z.literal(400),
  errorCode: z.literal('VALIDATION_ERROR'),
  message: z.literal('Validation error.'),
  details: z.array(z.string()).optional(),
});

const InternalServerErrorSchema = z.object({
  ...errorCore,
  statusCode: z.literal(500),
  errorCode: z.literal('INTERNAL_SERVER_ERROR'),
  message: z.literal('Internal server error.'),
});

export const { schemas: errorsSchemas, $ref: $errorsRef } = buildJsonSchemas(
  {
    NameAlreadyExistsErrorSchema,
    CourseNotFoundErrorSchema,
    ValidationErrorSchema,
    InternalServerErrorSchema,
  },
  { $id: 'errorsSchemas' }
);
