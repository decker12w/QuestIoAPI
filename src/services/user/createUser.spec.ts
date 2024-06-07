import 'reflect-metadata';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateUserService } from './createUser';
import { InMemoryUsersRepository } from '@/repositories/InMemoryRepository/InMemoryUsersRepository';
import { faker } from '@faker-js/faker';
import { UsernameAlreadyExistsError } from '../errors/UsernameAlreadyExistsError';

let usersRepository: InMemoryUsersRepository;
let sut: CreateUserService;

describe('Create User Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateUserService(usersRepository);
  });

  it('should be able to create a user', async () => {
    const user = await sut.execute({
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      college_register: faker.string.alphanumeric(6),
    });

    expect(user.id).toEqual(expect.any(Number));
  });

  it('should not be able to create a user with an already existing username', async () => {
    const username = faker.internet.userName();

    await usersRepository.create({
      fullname: faker.person.fullName(),
      username,
      email: faker.internet.email(),
      password: faker.internet.password(),
      college_register: faker.string.alphanumeric(6),
    });

    await expect(() =>
      sut.execute({
        fullname: faker.person.fullName(),
        username,
        email: faker.internet.email(),
        password: faker.internet.password(),
        college_register: faker.string.alphanumeric(6),
      })
    ).rejects.toBeInstanceOf(UsernameAlreadyExistsError);
  });
});
