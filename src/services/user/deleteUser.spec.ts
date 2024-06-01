import 'reflect-metadata';
import { beforeEach, describe, expect, it } from 'vitest';
import { DeleteUserByIdService } from './deleteUserByIdService';
import { InMemoryUsersRepository } from '@/repositories/InMemoryRepository/InMemoryUsersRepository';
import { faker } from '@faker-js/faker';
import { UserNotFoundError } from '../errors/UserNotFoundError';

let usersRepository: InMemoryUsersRepository;
let sut: DeleteUserByIdService;

describe('Delete User Service ', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new DeleteUserByIdService(usersRepository);
  });

  it('should be able to delete a user', async () => {
    const userMock = await usersRepository.create({
      fullname: faker.person.fullName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      college_register: faker.string.alphanumeric(6),
    });

    const response = await sut.execute({ userId: userMock.id });

    const deletedUser = await usersRepository.findById(userMock.id);

    expect(deletedUser).toBeNull();
    expect(response.user).toEqual(userMock);
  });

  it('should not be able to delete a user with wrong id', async () => {
    await expect(() => sut.execute({ userId: 1 })).rejects.toBeInstanceOf(
      UserNotFoundError
    );
  });
});
