import { Prisma, RefreshToken } from '@prisma/client';

export interface RefreshTokensRepository {
  create(data: Prisma.RefreshTokenUncheckedCreateInput): Promise<RefreshToken>;
  update(
    oldToken: string,
    newToken: string,
    newExpiresAt: Date
  ): Promise<RefreshToken | null>;
  invalidate(token: string): Promise<RefreshToken | null>;
  fetchRefreshToken(token: string): Promise<RefreshToken | null>;
}
