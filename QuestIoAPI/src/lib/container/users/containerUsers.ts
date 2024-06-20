import { DeleteUserByIdController } from '@/http/controllers/user/deleteUserById';
import { GetUserByIdController } from '@/http/controllers/user/getUserById';
import { UpdateUserByIdController } from '@/http/controllers/user/updateUserById';
import { PrismaUsersRepository } from '@/repositories/prismaRepository/prismaUsersRepository';
import { UsersRepository } from '@/repositories/usersRepository';
import { DeleteUserByIdService } from '@/services/user/deleteUserById';
import { GetUserByIdService } from '@/services/user/getUserById';
import { UpdateUserByIdService } from '@/services/user/updateUserById';
import { HashPasswordBycriptjs } from '@/utils/class/hashPassword/hashPasswordBycriptjs';
import { HashPassword } from '@/utils/interfaces/HashPassword';
import { container } from 'tsyringe';
import '../refreshToken/containerToken';

//Repositories
container.register<UsersRepository>('UsersRepository', {
  useClass: PrismaUsersRepository,
});

//Dependencies
container.register<HashPassword>('HashPassword', {
  useClass: HashPasswordBycriptjs,
});

//Services
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
container.register<GetUserByIdController>('GetUserByIdController', {
  useClass: GetUserByIdController,
});

container.register<UpdateUserByIdService>('UpdateUserByIdService', {
  useClass: UpdateUserByIdService,
});

container.register<DeleteUserByIdController>('DeleteUserByIdController', {
  useClass: DeleteUserByIdController,
});
