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

    const user = await sut.execute({ id: userMock.id });

    const deletedUser = await usersRepository.findById(userMock.id);

    expect(deletedUser).toBeNull();
    expect(user).toEqual(userMock);
  });

  it('should not be able to delete a user with wrong id', async () => {
    await expect(() => sut.execute({ id: 1 })).rejects.toBeInstanceOf(
      UserNotFoundError
    );
  });
});
