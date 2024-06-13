import { AuthenticateController } from '@/http/controllers/auth/authenticate';
import { RegisterUserController } from '@/http/controllers/auth/registerUser';
import { DeleteUserByIdController } from '@/http/controllers/user/deleteUserById';
import { GetUserByIdController } from '@/http/controllers/user/getUserById';

import { UpdateUserByIdController } from '@/http/controllers/user/updateUserById';

import { PrismaUsersRepository } from '@/repositories/prismaRepository/prismaUsersRepository';
import { UsersRepository } from '@/repositories/usersRepository';
import { AuthenticateService } from '@/services/auth/authenticate';
import { DeleteUserByIdService } from '@/services/user/deleteUserById';
import { GetUserByIdService } from '@/services/user/getUserById';
import { RegisterUserService } from '@/services/auth/registerUser';
import { UpdateUserByIdService } from '@/services/user/updateUserById';
import { HashPasswordBycriptjs } from '@/utils/class/hashPassword/hashPasswordBycriptjs';
import { HashPassword } from '@/utils/interfaces/HashPassword';
import { container } from 'tsyringe';

//Repositories
container.register<UsersRepository>('UsersRepository', {
  useClass: PrismaUsersRepository,
});

//Dependencies
container.register<HashPassword>('HashPassword', {
  useClass: HashPasswordBycriptjs,
});

//Services
container.register<RegisterUserService>('RegisterUserService', {
  useClass: RegisterUserService,
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

container.register<AuthenticateService>('AuthenticateService', {
  useClass: AuthenticateService,
});

//Controllers
container.register<RegisterUserController>('RegisterUserController', {
  useClass: RegisterUserController,
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

container.register<AuthenticateController>('AuthenticateController', {
  useClass: AuthenticateController,
});

// Resolve
const registerUserController = container.resolve<RegisterUserController>(
  'RegisterUserController'
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

const authenticateController = container.resolve<AuthenticateController>(
  'AuthenticateController'
);

export {
  registerUserController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
  authenticateController,
};
