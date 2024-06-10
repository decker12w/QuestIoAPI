import { FastifyInstance } from 'fastify';
import {
  getUserByIdController,
  deleteUserByIdController,
  updateUserByIdController,
} from '@/lib/container/users/containerUsers';
import { verifyJWT } from '../middlewares/verify-jwt';
import { getUserByIdDocs } from '@/utils/docs/swagger/usersDocs.ts/getUserById';
import { updateUserByIdDocs } from '@/utils/docs/swagger/usersDocs.ts/updateUserById';
import { deleteUserByIdDocs } from '@/utils/docs/swagger/usersDocs.ts/deleteUserById';

export async function userRoutes(app: FastifyInstance) {
  app.addHook('preHandler', verifyJWT);

  app.get(
    '/:id',
    getUserByIdDocs,
    getUserByIdController.handle.bind(getUserByIdController)
  );
  app.delete(
    '/delete/:id',
    deleteUserByIdDocs,
    deleteUserByIdController.handle.bind(deleteUserByIdController)
  );
  app.put(
    '/update/:id',
    updateUserByIdDocs,
    updateUserByIdController.handle.bind(updateUserByIdController)
  );
}
