import { CreateUserController } from '@/http/user/controllers/createController';
import { DeleteUserByIdController } from '@/http/user/controllers/deleteUserByIdController';
import { GetUserByIdController } from '@/http/user/controllers/getUserByIdController';
import { UpdateUserByIdController } from '@/http/user/controllers/updateUserByIdController';

import { PrismaUsersRepository } from '@/repositories/prismaRepository/prismaUsersRepository';
import { UsersRepository } from '@/repositories/usersRepository';
import { CreateUserService } from '@/services/user/createUser';
import { DeleteUserByIdService } from '@/services/user/deleteUserByIdService';
import { GetUserByIdService } from '@/services/user/getUserById';
import { UpdateUserByIdService } from '@/services/user/updateUserByIdService';
import { container } from 'tsyringe';

//Repositories
container.register<UsersRepository>('UsersRepository', {
  useClass: PrismaUsersRepository,
});

//Services
container.register<CreateUserService>('CreateUserService', {
  useClass: CreateUserService,
});

container.register<GetUserByIdService>('GetUserByIdService', {
  useClass: GetUserByIdService,
});

container.register<UpdateUserByIdController>('UpdateUserByIdController', {
  useClass: UpdateUserByIdController,
});

container.register<DeleteUserByIdService>('DeleteUserByIdService', {
  useClass: DeleteUserByIdService,
});

//Controllers
container.register<CreateUserController>('CreateUserController', {
  useClass: CreateUserController,
});

container.register<GetUserByIdController>('GetUserByIdController', {
  useClass: GetUserByIdController,
});

container.register<UpdateUserByIdService>('UpdateUserByIdService', {
  useClass: UpdateUserByIdService,
});

container.register<DeleteUserByIdController>('DeleteUserByIdController', {
  useClass: DeleteUserByIdController,
});

// Resolve
const createUserController = container.resolve<CreateUserController>(
  'CreateUserController'
);
const getUserByIdController = container.resolve<GetUserByIdController>(
  'GetUserByIdController'
);

const updateUserByIdController = container.resolve<UpdateUserByIdController>(
  'UpdateUserByIdController'
);
const deleteUserByIdController = container.resolve<DeleteUserByIdController>(
  'DeleteUserByIdController'
);

export {
  createUserController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
};
