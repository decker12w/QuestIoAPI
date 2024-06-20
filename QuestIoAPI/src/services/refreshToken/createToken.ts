import {
  RefreshTokenInput,
  RefreshTokenOutput,
} from '@/utils/schemas/refreshToken/refreshTokenShema';
import { inject, injectable } from 'tsyringe';
import { RefreshTokensRepository } from '@/repositories/refreshTokenRepository';

@injectable()
export class CreateRefreshTokenService {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: RefreshTokensRepository
  ) {}

  async execute({
    userId,
    token,
    expiresAt,
  }: RefreshTokenInput): Promise<RefreshTokenOutput> {
    const tokenCreated = await this.refreshTokensRepository.create({
      token,
      userId,
      expiresAt,
    });
    return tokenCreated;
  }
}
