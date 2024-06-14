import { Prisma, RefreshToken } from '@prisma/client';
import { RefreshTokensRepository } from '../refreshTokenRepository';

export class InMemoryRefreshTokensRepository
  implements RefreshTokensRepository
{
  public refreshTokens: RefreshToken[] = [];
  public nextId = 1;

  async create(data: Prisma.RefreshTokenUncheckedCreateInput) {
    const refreshToken: RefreshToken = {
      id: this.nextId,
      userId: data.userId,
      token: data.token,
      expiresAt: new Date(data.expiresAt),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.refreshTokens.push(refreshToken);
    this.nextId++;

    return refreshToken;
  }

  async update(oldToken: string, newToken: string, newExpiresAt: Date) {
    const index = this.refreshTokens.findIndex((rt) => rt.token === oldToken);

    if (index === -1) {
      return null;
    }

    const updatedToken = {
      ...this.refreshTokens[index],
      token: newToken,
      expiresAt: newExpiresAt,
      updatedAt: new Date(),
    };

    this.refreshTokens[index] = updatedToken;
    return updatedToken;
  }

  async invalidate(token: string) {
    const tokenFound = this.refreshTokens.find((item) => item.token === token);

    if (!tokenFound) {
      return null;
    }

    this.refreshTokens = this.refreshTokens.filter(
      (item) => item.token !== token
    );

    return tokenFound;
  }

  async fetchRefreshToken(token: string) {
    const tokenFound = this.refreshTokens.find((item) => item.token === token);

    if (!tokenFound) {
      return null;
    }

    return tokenFound;
  }
}
