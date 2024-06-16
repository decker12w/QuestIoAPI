import { FastifyInstance } from 'fastify';
import {
  createCourseController,
  getCourseByIdController,
  deleteCourseByIdController,
  updateCourseByIdController,
} from '@/lib/container/course/containerCourse';
import { $ref } from '@/utils/schemas/course/courseSchema';
import { $errorsRef } from '@/utils/schemas/course/errorsSchema';

export async function CourseRoutes(app: FastifyInstance) {
  app.post(
    '/create',
    {
      schema: {
        body: $ref('createCourseBodySchema'),
        tags: ['Course'],
        response: {
          201: $ref('CourseResponseSchema'),
          409: $errorsRef('NameAlreadyExistsErrorSchema'),
          400: $errorsRef('ValidationErrorSchema'),
          500: $errorsRef('InternalServerErrorSchema'),
        },
      },
    },
    createCourseController.handle.bind(createCourseController)
  );
  app.get(
    '/:id',
    {
      schema: {
        tags: ['Course'],
        params: $ref('paramsIdSchema'),
        response: {
          200: $ref('CourseResponseSchema'),
          404: $errorsRef('CourseNotFoundErrorSchema'),
          500: $errorsRef('InternalServerErrorSchema'),
        },
      },
    },
    getCourseByIdController.handle.bind(getCourseByIdController)
  );
  app.delete(
    '/delete/:id',
    {
      schema: {
        tags: ['Course'],
        params: $ref('paramsIdSchema'),
        response: {
          204: $ref('CourseResponseSchema'),
          404: $errorsRef('CourseNotFoundErrorSchema'),
        },
      },
    },
    deleteCourseByIdController.handle.bind(deleteCourseByIdController)
  );
  app.put(
    '/update/:id',
    {
      schema: {
        tags: ['Course'],
        params: $ref('paramsIdSchema'),
        body: $ref('updateCourseBodySchema'),
        response: {
          200: $ref('CourseResponseSchema'),
          404: $errorsRef('CourseNotFoundErrorSchema'),
          400: $errorsRef('ValidationErrorSchema'),
          500: $errorsRef('InternalServerErrorSchema'),
        },
      },
    },
    updateCourseByIdController.handle.bind(updateCourseByIdController)
  );
}
