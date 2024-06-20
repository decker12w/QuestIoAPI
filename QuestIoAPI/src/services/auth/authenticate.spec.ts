import 'reflect-metadata';
import { InMemoryUsersRepository } from '@/repositories/InMemoryRepository/InMemoryUsersRepository';
import { HashPasswordMock } from '@/utils/mocks/hashPasswordMock';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthenticateService } from './authenticate';
import { HashPassword } from '@/utils/interfaces/HashPassword';
import { faker } from '@faker-js/faker';
import { InvalidCredencialsError } from '../@errors/InvalidCredencials';

let usersRepository: InMemoryUsersRepository;
let hashedPassword: HashPassword;
let sut: AuthenticateService;

describe('Authenticate Service Unit Test', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    hashedPassword = new HashPasswordMock();
    sut = new AuthenticateService(usersRepository, hashedPassword);
  });

  it('should be able to authenticate a user', async () => {
    const plainTextPassword = faker.internet.password();
    const userMock = {
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: await hashedPassword.hash(plainTextPassword),
      college_register: faker.string.alphanumeric(6),
    };

    const user = await usersRepository.create(userMock);

    const authenticatedUser = await sut.execute({
      email: user.email,
      password: plainTextPassword,
    });

    expect(authenticatedUser.id).toEqual(expect.any(Number));
  });

  it('should not be able to authenticate with a wrong email', async () => {
    const plainTextPassword = faker.internet.password();
    const userMock = {
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: await hashedPassword.hash(plainTextPassword),
      college_register: faker.string.alphanumeric(6),
    };

    await usersRepository.create(userMock);

    await expect(
      async () =>
        await sut.execute({
          email: 'emailFalso@gmail.com',
          password: plainTextPassword,
        })
    ).rejects.toBeInstanceOf(InvalidCredencialsError);
  });

  it('should not be able to authenticate with a wrong password', async () => {
    const plainTextPassword = faker.internet.password();
    const userMock = {
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: await hashedPassword.hash(plainTextPassword),
      college_register: faker.string.alphanumeric(6),
    };

    await usersRepository.create(userMock);

    await expect(
      async () =>
        await sut.execute({
          email: userMock.email,
          password: 'senhaErrada',
        })
    ).rejects.toBeInstanceOf(InvalidCredencialsError);
  });
});
