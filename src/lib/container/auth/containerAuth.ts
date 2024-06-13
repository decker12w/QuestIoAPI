import { RefreshTokenController } from '@/http/controllers/auth/refresh';
import { container } from 'tsyringe';

container.register<RefreshTokenController>('RefreshTokenController', {
  useClass: RefreshTokenController,
});

const refreshTokenController = container.resolve<RefreshTokenController>(
  'RefreshTokenController'
);

export { refreshTokenController };
