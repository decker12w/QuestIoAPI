import 'reflect-metadata';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/InMemoryRepository/InMemoryUsersRepository';
import { faker } from '@faker-js/faker';
import { UsernameAlreadyExistsError } from '../errors/UsernameAlreadyExists';
import { HashPassword } from '@/utils/interfaces/HashPassword';
import { HashPasswordMock } from '../../utils/mocks/hashPasswordMock';
import { RegisterUserService } from './registerUser';

let usersRepository: InMemoryUsersRepository;
let hashedPassword: HashPassword;
let sut: RegisterUserService;

describe('Create User Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    hashedPassword = new HashPasswordMock();
    sut = new RegisterUserService(usersRepository, hashedPassword);
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
