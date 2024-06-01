import { PrismaUsersRepository } from '@/repositories/prismaRepository/prismaUsersRepository';
import { CreateUserService } from '@/services/user/createUser';
import { DeleteUserByIdService } from '@/services/user/deleteUserByIdService';
import { UpdateUserByIdService } from '@/services/user/updateUserByIdService';
import { FastifyInstance } from 'fastify';
import { DeleteUserController } from './controllers/deleteUserController';
import { UpdateUserController } from './controllers/updateUserController';
import { CreateUserController } from './controllers/createController';
import { GetUserByIdController } from './controllers/getUserByIdController';
import { FindUserByIdService } from '@/services/user/findUserById';

export async function userRoutes(app: FastifyInstance) {
  //Todo Refatorar essa parte e aplicar injeção de dependencia com awilix
  const usersRepository = new PrismaUsersRepository();
  const createUserService = new CreateUserService(usersRepository);
  const deleteUserService = new DeleteUserByIdService(usersRepository);
  const updateUserService = new UpdateUserByIdService(usersRepository);
  const createUserController = new CreateUserController(createUserService);
  const deleteController = new DeleteUserController(deleteUserService);
  const updateController = new UpdateUserController(updateUserService);
  const getUsersService = new FindUserByIdService(usersRepository);
  const getUsersController = new GetUserByIdController(getUsersService);

  app.post('/create', createUserController.handle.bind(createUserController));
  app.get('/:id', getUsersController.handle.bind(getUsersController));
  app.delete('/delete/:id', deleteController.handle.bind(deleteController));
  app.put('/update/:id', updateController.handle.bind(updateController));
}
