import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { RefreshTokensRepository } from '../refreshTokenRepository';

export class PrismaRefreshTokensRepository implements RefreshTokensRepository {
  async create(data: Prisma.RefreshTokenUncheckedCreateInput) {
    return await prisma.refreshToken.create({
      data: {
        ...data,
      },
    });
  }

  async update(oldToken: string, newToken: string, newExpiresAt: Date) {
    return await prisma.refreshToken.update({
      where: { token: oldToken },
      data: {
        token: newToken,
        expiresAt: newExpiresAt,
      },
    });
  }

  async invalidate(token: string) {
    const tokenInvalidated = await prisma.refreshToken.delete({
      where: { token },
    });

    return tokenInvalidated;
  }

  async fetchRefreshToken(token: string) {
    return await prisma.refreshToken.findUnique({
      where: { token },
    });
  }
}
