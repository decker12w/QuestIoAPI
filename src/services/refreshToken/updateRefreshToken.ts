import { inject, injectable } from 'tsyringe';
import { RefreshTokensRepository } from '@/repositories/refreshTokenRepository';
import { InvalidTokenError } from '../@errors/InvalidToken';
import { VerifyRefreshTokenService } from './verifyToken';
import {
  UpdateTokenInput,
  RefreshTokenOutput,
} from '@/utils/schemas/refreshToken/refreshTokenShema';

@injectable()
export class UpdateRefreshTokenService {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: RefreshTokensRepository,
    @inject('VerifyRefreshTokenService')
    private verifyRefreshTokenService: VerifyRefreshTokenService
  ) {}

  async execute({
    oldToken,
    newToken,
    newExpiresAt,
  }: UpdateTokenInput): Promise<RefreshTokenOutput> {
    await this.verifyRefreshTokenService.execute({ token: oldToken });

    const updatedToken = await this.refreshTokensRepository.update(
      oldToken,
      newToken,
      newExpiresAt
    );

    if (!updatedToken) {
      throw new InvalidTokenError();
    }

    return updatedToken;
  }
}
