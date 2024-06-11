import {
  authenticateController,
  registerUserController,
} from '@/lib/container/users/containerUsers';
import { authenticateDocs } from '@/utils/docs/swagger/usersDocs.ts/authenticate';
import { createUserDocs } from '@/utils/docs/swagger/usersDocs.ts/createUser';

import { FastifyInstance } from 'fastify';

export async function authRoutes(app: FastifyInstance) {
  app.post(
    '/signin',
    authenticateDocs,
    authenticateController.authenticate.bind(authenticateController)
  );

  app.post(
    '/register',
    createUserDocs,
    registerUserController.handle.bind(registerUserController)
  );
}
