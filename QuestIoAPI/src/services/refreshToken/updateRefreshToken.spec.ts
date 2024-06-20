import 'reflect-metadata';
import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { InMemoryRefreshTokensRepository } from '@/repositories/InMemoryRepository/InMemoryRefreshTokensRepository';
import { VerifyRefreshTokenService } from './verifyToken';
import { InvalidTokenError } from '../@errors/InvalidToken';
import { UpdateRefreshTokenService } from './updateRefreshToken';

let refreshTokensRepository: InMemoryRefreshTokensRepository;
let verifyRefreshTokenService: VerifyRefreshTokenService;
let sut: UpdateRefreshTokenService;

describe('Update Refresh Token Service', () => {
  beforeEach(() => {
    refreshTokensRepository = new InMemoryRefreshTokensRepository();
    verifyRefreshTokenService = new VerifyRefreshTokenService(
      refreshTokensRepository
    );
    sut = new UpdateRefreshTokenService(
      refreshTokensRepository,
      verifyRefreshTokenService
    );
  });

  it('should be able to update a token', async () => {
    const oldTokenMock = {
      token: faker.string.alphanumeric(7),
      userId: 1,
      expiresAt: new Date(new Date().getTime() + 10000), // Data futura para garantir que não expire
    };

    await refreshTokensRepository.create(oldTokenMock);

    const newTokenMock = faker.string.alphanumeric(7);
    const newExpiresAt = new Date(new Date().getTime() + 20000); // Nova data futura

    const updatedToken = await sut.execute({
      oldToken: oldTokenMock.token,
      newToken: newTokenMock,
      newExpiresAt: newExpiresAt,
    });

    expect(updatedToken.token).toEqual(newTokenMock);
    expect(updatedToken.expiresAt).toEqual(newExpiresAt);
  });

  it('should not be able to update an invalid token', async () => {
    await expect(
      sut.execute({
        oldToken: 'invalidToken',
        newToken: 'newToken',
        newExpiresAt: new Date(new Date().getTime() + 20000),
      })
    ).rejects.toBeInstanceOf(InvalidTokenError);
  });

  it('should not be able to update an expired token', async () => {
    const expiredTokenMock = {
      token: faker.string.alphanumeric(7),
      userId: 1,
      expiresAt: new Date(new Date().getTime() - 10000),
    };

    await refreshTokensRepository.create(expiredTokenMock);

    await expect(
      sut.execute({
        oldToken: expiredTokenMock.token,
        newToken: faker.string.alphanumeric(7),
        newExpiresAt: new Date(new Date().getTime() + 20000),
      })
    ).rejects.toBeInstanceOf(InvalidTokenError);
  });
});
