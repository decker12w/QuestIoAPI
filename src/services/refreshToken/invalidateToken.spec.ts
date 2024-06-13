import 'reflect-metadata';
import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { InMemoryRefreshTokensRepository } from '@/repositories/InMemoryRepository/InMemoryRefreshTokensRepository';
import { InvalidateRefreshTokenService } from './invalidateToken';
import { ResourceNotFoundError } from '../@errors/ResourceNotFound';

let refreshTokensRepository: InMemoryRefreshTokensRepository;
let invalidateRefreshTokenService: InvalidateRefreshTokenService;

describe('Invalidate Token Service', () => {
  beforeEach(() => {
    refreshTokensRepository = new InMemoryRefreshTokensRepository();
    invalidateRefreshTokenService = new InvalidateRefreshTokenService(
      refreshTokensRepository
    );
  });

  it('should be able to invalidate a token', async () => {
    const validTokenMock = {
      token: faker.string.alphanumeric(7),
      userId: 1,
      expiresAt: new Date(new Date().getTime() + 10000),
    };

    await refreshTokensRepository.create(validTokenMock);

    await invalidateRefreshTokenService.execute({
      token: validTokenMock.token,
    });

    const fetchedToken = await refreshTokensRepository.fetchRefreshToken(
      validTokenMock.token
    );

    expect(fetchedToken).toBeNull();
  });

  it('should not be able to invalidate a token that does not exists', async () => {
    await expect(() =>
      invalidateRefreshTokenService.execute({ token: 'nonexistentToken' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
