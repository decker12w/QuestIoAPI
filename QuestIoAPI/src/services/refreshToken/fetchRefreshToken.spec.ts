import 'reflect-metadata';
import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { InMemoryRefreshTokensRepository } from '@/repositories/InMemoryRepository/InMemoryRefreshTokensRepository';
import { FetchRefreshTokenService } from './fetchRefreshToken';
import { ResourceNotFoundError } from '../@errors/ResourceNotFound';

let refreshTokensRepository: InMemoryRefreshTokensRepository;
let sut: FetchRefreshTokenService;

describe('Get refreshToken Service', () => {
  beforeEach(() => {
    refreshTokensRepository = new InMemoryRefreshTokensRepository();
    sut = new FetchRefreshTokenService(refreshTokensRepository);
  });

  it('should be able to fetch a token', async () => {
    const tokenMock = {
      token: faker.string.alphanumeric(7),
      userId: 1,
      expiresAt: new Date(),
    };

    await refreshTokensRepository.create(tokenMock);

    const token = await sut.execute({
      token: tokenMock.token,
    });

    expect(token.id).toEqual(expect.any(Number));
  });

  it('should not be able to fetch a token', async () => {
    await expect(() =>
      sut.execute({
        token: 'fakeToken',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
