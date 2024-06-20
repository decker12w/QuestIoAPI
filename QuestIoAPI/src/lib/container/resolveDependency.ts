import { AuthenticateController } from '@/http/controllers/auth/authenticate';
import { RefreshTokenController } from '@/http/controllers/auth/refresh';
import { RegisterUserController } from '@/http/controllers/auth/registerUser';
import { DeleteUserByIdController } from '@/http/controllers/user/deleteUserById';
import { GetUserByIdController } from '@/http/controllers/user/getUserById';
import { UpdateUserByIdController } from '@/http/controllers/user/updateUserById';
import { CreateCourseController } from '@/http/controllers/course/createController';
import { DeleteCourseByIdController } from '@/http/controllers/course/deleteCourseByIdController';
import { GetCourseByIdController } from '@/http/controllers/course/getCourseByIdController';
import { UpdateCourseByIdController } from '@/http/controllers/course/updateCourseByIdController';
import { LogoutController } from '@/http/controllers/auth/logout';
import { container } from 'tsyringe';
import '../container/users/containerUsers';
import '../container/refreshToken/containerToken';
import '../container/auth/containerAuth';
import '../container/course/containerCourse';

// User
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

// Auth
const authenticateController = container.resolve<AuthenticateController>(
  'AuthenticateController'
);

const refreshTokenController = container.resolve<RefreshTokenController>(
  'RefreshTokenController'
);

const logoutController =
  container.resolve<LogoutController>('LogoutController');

// Course

const createCourseController = container.resolve<CreateCourseController>(
  'CreateCourseController'
);
const getCourseByIdController = container.resolve<GetCourseByIdController>(
  'GetCourseByIdController'
);

const updateCourseByIdController =
  container.resolve<UpdateCourseByIdController>('UpdateCourseByIdController');
const deleteCourseByIdController =
  container.resolve<DeleteCourseByIdController>('DeleteCourseByIdController');

export {
  registerUserController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
  authenticateController,
  refreshTokenController,
  logoutController,
  createCourseController,
  getCourseByIdController,
  updateCourseByIdController,
  deleteCourseByIdController,
};
