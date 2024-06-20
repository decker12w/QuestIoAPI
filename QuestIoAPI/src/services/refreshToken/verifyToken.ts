import { inject, injectable } from 'tsyringe';
import { RefreshTokensRepository } from '@/repositories/refreshTokenRepository';
import { InvalidTokenError } from '../@errors/InvalidToken';
import {
  RefreshTokenOutput,
  TokenInput,
} from '@/utils/schemas/refreshToken/refreshTokenShema';

@injectable()
export class VerifyRefreshTokenService {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: RefreshTokensRepository
  ) {}

  async execute({ token }: TokenInput): Promise<RefreshTokenOutput> {
    const savedToken =
      await this.refreshTokensRepository.fetchRefreshToken(token);

    if (!savedToken || new Date(savedToken.expiresAt) <= new Date()) {
      throw new InvalidTokenError();
    }

    return savedToken;
  }
}
