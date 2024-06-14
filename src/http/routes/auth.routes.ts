import {
  authenticateController,
  logoutController,
  refreshTokenController,
  registerUserController,
} from '@/lib/container/resolveDependency';
import { authenticateDocs } from '@/utils/docs/swagger/usersDocs.ts/authenticate';
import { createUserDocs } from '@/utils/docs/swagger/usersDocs.ts/createUser';

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
    refreshTokenController.refresh.bind(refreshTokenController)
  );
  app.post(
    '/register',
    {
      schema: createUserDocs,
    },

    registerUserController.handle.bind(registerUserController)
  );
  app.post(
    '/logout',

    logoutController.logout.bind(logoutController)
  );
}
