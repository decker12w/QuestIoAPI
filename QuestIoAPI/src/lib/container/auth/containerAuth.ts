import { AuthenticateController } from '@/http/controllers/auth/authenticate';
import { LogoutController } from '@/http/controllers/auth/logout';
import { RefreshTokenController } from '@/http/controllers/auth/refresh';
import { RegisterUserController } from '@/http/controllers/auth/registerUser';
import { AuthenticateService } from '@/services/auth/authenticate';
import { RegisterUserService } from '@/services/auth/registerUser';
import { container } from 'tsyringe';

//Services
container.register<RegisterUserService>('RegisterUserService', {
  useClass: RegisterUserService,
});

container.register<AuthenticateService>('AuthenticateService', {
  useClass: AuthenticateService,
});

//Controllers
container.register<RegisterUserController>('RegisterUserController', {
  useClass: RegisterUserController,
});

container.register<AuthenticateController>('AuthenticateController', {
  useClass: AuthenticateController,
});

container.register<RefreshTokenController>('RefreshTokenController', {
  useClass: RefreshTokenController,
});

container.register<LogoutController>('LogoutController', {
  useClass: LogoutController,
});
