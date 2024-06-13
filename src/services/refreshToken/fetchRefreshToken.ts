import {
  RefreshTokenOutput,
  TokenInput,
} from '@/utils/schemas/refreshToken/refreshTokenShema';
import { inject, injectable } from 'tsyringe';
import { RefreshTokensRepository } from '@/repositories/refreshTokenRepository';
import { ResourceNotFoundError } from '../@errors/ResourceNotFound';

@injectable()
export class FetchRefreshTokenService {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: RefreshTokensRepository
  ) {}

  async execute({ token }: TokenInput): Promise<RefreshTokenOutput> {
    const tokenFound =
      await this.refreshTokensRepository.fetchRefreshToken(token);

    if (!tokenFound) {
      throw new ResourceNotFoundError('Token not found');
    }

    return tokenFound;
  }
}
