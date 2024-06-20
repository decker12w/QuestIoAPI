import 'reflect-metadata';
import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { InMemoryRefreshTokensRepository } from '@/repositories/InMemoryRepository/InMemoryRefreshTokensRepository';
import { CreateRefreshTokenService } from './createToken';

let refreshTokensRepository: InMemoryRefreshTokensRepository;
let sut: CreateRefreshTokenService;

describe('Create refreshToken Service', () => {
  beforeEach(() => {
    refreshTokensRepository = new InMemoryRefreshTokensRepository();
    sut = new CreateRefreshTokenService(refreshTokensRepository);
  });

  it('should be able to create a token', async () => {
    const token = await sut.execute({
      token: faker.string.alphanumeric(7),
      userId: 1,
      expiresAt: new Date(),
    });

    expect(token.id).toEqual(expect.any(Number));
  });
});
