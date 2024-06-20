import {
  authenticateController,
  logoutController,
  refreshTokenController,
  registerUserController,
} from '@/lib/container/resolveDependency';
import { authenticateDocs } from '@/utils/docs/swagger/authDocs/authenticate';
import { logoutDocs } from '@/utils/docs/swagger/authDocs/logout';
import { refreshTokenDocs } from '@/utils/docs/swagger/authDocs/refreshToken';
import { registerUserDocs } from '@/utils/docs/swagger/authDocs/registerUser';

import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../middlewares/verify-jwt';

export async function authRoutes(app: FastifyInstance) {
  app.post(
    '/signin',
    { schema: authenticateDocs },
    authenticateController.authenticate.bind(authenticateController)
  );
  app.post(
    '/register',
    { schema: registerUserDocs },
    registerUserController.handle.bind(registerUserController)
  );
  app.patch(
    '/token/refresh',
    { schema: refreshTokenDocs, preHandler: verifyJWT },
    refreshTokenController.refresh.bind(refreshTokenController)
  );

  app.post(
    '/logout',
    { schema: logoutDocs, preHandler: verifyJWT },
    logoutController.logout.bind(logoutController)
  );
}
