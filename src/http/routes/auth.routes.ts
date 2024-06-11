import {
  authenticateController,
  registerUserController,
} from '@/lib/container/users/containerUsers';
import { authenticateDocs } from '@/utils/docs/swagger/usersDocs.ts/authenticate';
import { $errorsRef } from '@/utils/schemas/user/errorsSchema';
import { $ref } from '@/utils/schemas/user/userSchema';
import { FastifyInstance } from 'fastify';

export async function authRoutes(app: FastifyInstance) {
  app.post(
    '/signin',
    authenticateDocs,
    authenticateController.authenticate.bind(authenticateController)
  );

  app.post(
    '/register',
    {
      schema: {
        body: $ref('createUserBodySchema'),
        tags: ['Auth'],
        response: {
          201: $ref('UserResponseSchema'),
          409: {
            type: 'object',
            oneOf: [
              $errorsRef('EmailAlreadyExistsErrorSchema'),
              $errorsRef('UsernameAlreadyExistsErrorSchema'),
            ],
          },
          400: $errorsRef('ValidationErrorSchema'),
          500: $errorsRef('InternalServerErrorSchema'),
        },
      },
    },

    registerUserController.handle.bind(registerUserController)
  );
}
