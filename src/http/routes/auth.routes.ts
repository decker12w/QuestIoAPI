import {
  authenticateController,
  registerUserController,
} from '@/lib/container/users/containerUsers';
import { authenticateDocs } from '@/utils/docs/swagger/usersDocs.ts/authenticate';
import { createUserDocs } from '@/utils/docs/swagger/usersDocs.ts/createUser';
import { refreshTokenController } from '@/lib/container/auth/containerAuth';
import { FastifyInstance } from 'fastify';

export async function authRoutes(app: FastifyInstance) {
  app.post(
    '/signin',
    {
      schema: authenticateDocs,
    },
    authenticateController.authenticate.bind(authenticateController)
  );
  app.patch(
    '/token/refresh',
    refreshTokenController.refresh.bind(authenticateController)
  );
  app.post(
    '/register',
    {
      schema: createUserDocs,
    },

    registerUserController.handle.bind(registerUserController)
  );
}
