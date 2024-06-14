import { FastifyInstance } from 'fastify';

import { verifyJWT } from '../middlewares/verify-jwt';
import { getUserByIdDocs } from '@/utils/docs/swagger/usersDocs.ts/getUserById';
import { updateUserByIdDocs } from '@/utils/docs/swagger/usersDocs.ts/updateUserById';
import { deleteUserByIdDocs } from '@/utils/docs/swagger/usersDocs.ts/deleteUserById';
import {
  deleteUserByIdController,
  getUserByIdController,
  updateUserByIdController,
} from '@/lib/container/resolveDependency';

export async function userRoutes(app: FastifyInstance) {
  app.addHook('preHandler', verifyJWT);

  app.get(
    '/:id',
    { schema: getUserByIdDocs },
    getUserByIdController.handle.bind(getUserByIdController)
  );
  app.delete(
    '/delete/:id',
    { schema: deleteUserByIdDocs },
    deleteUserByIdController.handle.bind(deleteUserByIdController)
  );
  app.put(
    '/update/:id',
    { schema: updateUserByIdDocs },
    updateUserByIdController.handle.bind(updateUserByIdController)
  );
}
