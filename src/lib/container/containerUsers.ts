import { CreateUserController } from '@/http/controllers/user/createUser';
import { DeleteUserByIdController } from '@/http/controllers/user/deleteUserById';
import { GetUserByIdController } from '@/http/controllers/user/getUserById';
import { UpdateUserByIdController } from '@/http/controllers/user/updateUserById';

import { PrismaUsersRepository } from '@/repositories/prismaRepository/prismaUsersRepository';
import { UsersRepository } from '@/repositories/usersRepository';
import { CreateUserService } from '@/services/user/createUser';
import { DeleteUserByIdService } from '@/services/user/deleteUserById';
import { GetUserByIdService } from '@/services/user/getUserById';
import { UpdateUserByIdService } from '@/services/user/updateUserById';
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
