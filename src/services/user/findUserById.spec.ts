import { InMemoryUsersRepository } from '@/repositories/InMemoryRepository/InMemoryUsersRepository';
import { beforeEach, describe, expect, it } from 'vitest';
import { FindUserByIdService } from './findUserById';
import { faker } from '@faker-js/faker';
import { UserNotFoundError } from '../errors/UserNotFoundError';

let usersRepository: InMemoryUsersRepository;
let sut: FindUserByIdService;

describe('Find User By Id Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new FindUserByIdService(usersRepository);
  });

  it('should be able to find a user by id', async () => {
    const userMock = await usersRepository.create({
      fullname: faker.person.fullName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      college_register: faker.string.alphanumeric(6),
    });

    const { user } = await sut.execute({ userId: userMock.id });

    expect(user.id).toEqual(userMock.id);
  });

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() => sut.execute({ userId: 1 })).rejects.toBeInstanceOf(
      UserNotFoundError
    );
  });
});
