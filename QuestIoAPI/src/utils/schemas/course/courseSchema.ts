import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

export const courseCore = {
  name: z.string({
    required_error: 'Name is required.',
    invalid_type_error: 'Name must be a string.',
  }),
  description: z.string({
    required_error: 'Description messagge is required',
    invalid_type_error: 'Description must be a string'
  }),
};

export const createCourseBodySchema = z.object({ ...courseCore }).strict();

export const updateCourseBodySchema = z
  .object({...courseCore })
  .strict();

export const updateCourseService = z
  .object({ id: z.number(), ...courseCore })
  .strict();

export const CourseResponseSchema = z
  .object({
    id: z.number(),
    ...courseCore,
  })
  .strict();

export const paramsIdSchema = z
  .object({
    id: z.string().transform(Number),
  })
  .strict();

export type CreateCourseInput = z.infer<typeof createCourseBodySchema>;
export type CourseOutput = z.infer<typeof CourseResponseSchema>;
export type ParamsIdInput = z.infer<typeof paramsIdSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseBodySchema>;
export type UpdateCourseService = z.infer<typeof updateCourseService>;

export const { schemas: courseSchemas, $ref } = buildJsonSchemas(
  {
    createCourseBodySchema,
    CourseResponseSchema,
    paramsIdSchema,
    updateCourseBodySchema,
    updateCourseService,
  },
  { $id: 'courseSchemas' }
);
