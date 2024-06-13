import { inject, injectable } from 'tsyringe';
import { RefreshTokensRepository } from '@/repositories/refreshTokenRepository';
import {
  RefreshTokenOutput,
  TokenInput,
} from '@/utils/schemas/refreshToken/refreshTokenShema';
import { ResourceNotFoundError } from '../@errors/ResourceNotFound';

@injectable()
export class InvalidateRefreshTokenService {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: RefreshTokensRepository
  ) {}

  async execute({ token }: TokenInput): Promise<RefreshTokenOutput> {
    const tokenInvalidated =
      await this.refreshTokensRepository.invalidate(token);

    if (!tokenInvalidated) {
      throw new ResourceNotFoundError('Token not found');
    }

    return tokenInvalidated;
  }
}
