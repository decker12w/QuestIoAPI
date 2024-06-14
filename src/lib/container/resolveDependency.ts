import { AuthenticateController } from '@/http/controllers/auth/authenticate';
import { RefreshTokenController } from '@/http/controllers/auth/refresh';
import { RegisterUserController } from '@/http/controllers/auth/registerUser';
import { DeleteUserByIdController } from '@/http/controllers/user/deleteUserById';
import { GetUserByIdController } from '@/http/controllers/user/getUserById';
import { UpdateUserByIdController } from '@/http/controllers/user/updateUserById';
import { container } from 'tsyringe';
import '../container/refreshToken/containerToken';
import '../container/auth/containerAuth';
import '../container/users/containerUsers';
import { LogoutController } from '@/http/controllers/auth/logout';

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

const refreshTokenController = container.resolve<RefreshTokenController>(
  'RefreshTokenController'
);

const logoutController =
  container.resolve<LogoutController>('LogoutController');

export {
  registerUserController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
  authenticateController,
  refreshTokenController,
  logoutController,
};
