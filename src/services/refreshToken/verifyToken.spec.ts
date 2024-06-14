import 'reflect-metadata';
import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { InMemoryRefreshTokensRepository } from '@/repositories/InMemoryRepository/InMemoryRefreshTokensRepository';
import { VerifyRefreshTokenService } from './verifyToken';
import { InvalidTokenError } from '../@errors/InvalidToken';

let refreshTokensRepository: InMemoryRefreshTokensRepository;
let sut: VerifyRefreshTokenService;

describe('Verify Token Service', () => {
  beforeEach(() => {
    refreshTokensRepository = new InMemoryRefreshTokensRepository();
    sut = new VerifyRefreshTokenService(refreshTokensRepository);
  });

  it('should be able to verify a token', async () => {
    const tokenMock = {
      token: faker.string.alphanumeric(7),
      userId: 1,
      expiresAt: faker.date.future({ years: 10 }),
    };

    await refreshTokensRepository.create(tokenMock);

    const token = await sut.execute({ token: tokenMock.token });

    expect(token.id).toEqual(expect.any(Number));
  });

  it('should not be able to verify a token that does not exist', async () => {
    await expect(() =>
      sut.execute({
        token: 'fakeToken',
      })
    ).rejects.toBeInstanceOf(InvalidTokenError);
  });

  it('should not be able to verify a expired token', async () => {
    const expiredTokenMock = {
      token: faker.string.alphanumeric(7),
      userId: 1,
      expiresAt: new Date(new Date().getTime() - 10000),
    };

    await refreshTokensRepository.create(expiredTokenMock);

    await expect(
      sut.execute({
        token: expiredTokenMock.token,
      })
    ).rejects.toBeInstanceOf(InvalidTokenError);
  });
});
