import { PrismaRefreshTokensRepository } from '@/repositories/prismaRepository/prismaRefreshTokenRepository';
import { RefreshTokensRepository } from '@/repositories/refreshTokenRepository';
import { CreateRefreshTokenService } from '@/services/refreshToken/createToken';
import { FetchRefreshTokenService } from '@/services/refreshToken/fetchRefreshToken';
import { InvalidateRefreshTokenService } from '@/services/refreshToken/invalidateToken';
import { UpdateRefreshTokenService } from '@/services/refreshToken/updateRefreshToken';
import { VerifyRefreshTokenService } from '@/services/refreshToken/verifyToken';
import { container } from 'tsyringe';

//Repositories
container.register<RefreshTokensRepository>('RefreshTokensRepository', {
  useClass: PrismaRefreshTokensRepository,
});

//Services
container.register<VerifyRefreshTokenService>('VerifyRefreshTokenService', {
  useClass: VerifyRefreshTokenService,
});

container.register<CreateRefreshTokenService>('CreateRefreshTokenService', {
  useClass: CreateRefreshTokenService,
});

container.register<FetchRefreshTokenService>('FetchRefreshTokenService ', {
  useClass: FetchRefreshTokenService,
});

container.register<InvalidateRefreshTokenService>(
  'InvalidateRefreshTokenService',
  {
    useClass: InvalidateRefreshTokenService,
  }
);

container.register<UpdateRefreshTokenService>('UpdateRefreshTokenService', {
  useClass: UpdateRefreshTokenService,
});
