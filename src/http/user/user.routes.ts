import { FastifyInstance } from 'fastify';
import {
  createUserController,
  getUserByIdController,
  deleteUserByIdController,
  updateUserByIdController,
} from '@/lib/container/containerUsers';

export async function userRoutes(app: FastifyInstance) {
  app.post('/create', createUserController.handle.bind(createUserController));
  app.get('/:id', getUserByIdController.handle.bind(getUserByIdController));
  app.delete(
    '/delete/:id',
    deleteUserByIdController.handle.bind(deleteUserByIdController)
  );
  app.put(
    '/update/:id',
    updateUserByIdController.handle.bind(updateUserByIdController)
  );
}
