import { FastifyInstance } from 'fastify';
import {
  createUserController,
  getUserByIdController,
  deleteUserByIdController,
  updateUserByIdController,
} from '@/lib/container/containerUsers';
import { $ref } from '@/utils/schemas/user/userSchema';
import { $errorsRef } from '@/utils/schemas/user/errorsSchema';

export async function userRoutes(app: FastifyInstance) {
  app.post(
    '/create',
    {
      schema: {
        body: $ref('createUserBodySchema'),
        tags: ['Users'],
        response: {
          201: $ref('UserResponseSchema'),
          409: $errorsRef('UsernameAlreadyExistsErrorSchema'),
          400: $errorsRef('ValidationErrorSchema'),
          500: $errorsRef('InternalServerErrorSchema'),
        },
      },
    },
    createUserController.handle.bind(createUserController)
  );
  app.get(
    '/:id',
    {
      schema: {
        tags: ['Users'],
        params: $ref('paramsIdSchema'),
        response: {
          200: $ref('UserResponseSchema'),
          404: $errorsRef('UserNotFoundErrorSchema'),
          500: $errorsRef('InternalServerErrorSchema'),
        },
      },
    },
    getUserByIdController.handle.bind(getUserByIdController)
  );
  app.delete(
    '/delete/:id',
    {
      schema: {
        tags: ['Users'],
        params: $ref('paramsIdSchema'),
        response: {
          204: $ref('UserResponseSchema'),
          404: $errorsRef('UserNotFoundErrorSchema'),
        },
      },
    },
    deleteUserByIdController.handle.bind(deleteUserByIdController)
  );
  app.put(
    '/update/:id',
    {
      schema: {
        tags: ['Users'],
        params: $ref('paramsIdSchema'),
        body: $ref('updateUserBodySchema'),
        response: {
          200: $ref('UserResponseSchema'),
          404: $errorsRef('UserNotFoundErrorSchema'),
          400: $errorsRef('ValidationErrorSchema'),
          500: $errorsRef('InternalServerErrorSchema'),
        },
      },
    },
    updateUserByIdController.handle.bind(updateUserByIdController)
  );
}
