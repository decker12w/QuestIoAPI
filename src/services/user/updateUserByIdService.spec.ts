import 'reflect-metadata';
import { InMemoryUsersRepository } from '@/repositories/InMemoryRepository/InMemoryUsersRepository';
import { beforeEach, describe, expect, it } from 'vitest';
import { UpdateUserByIdService } from './updateUserByIdService';
import { faker } from '@faker-js/faker';
import { UserNotFoundError } from '../errors/UserNotFoundError';
import { compare } from 'bcryptjs';

let usersRepository: InMemoryUsersRepository;
let sut: UpdateUserByIdService;

describe('Update User Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdateUserByIdService(usersRepository);
  });

  it('should be able to update a user', async () => {
    const userMock = await usersRepository.create({
      fullname: faker.person.fullName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      xp_count: 10,
      user_role: 'USER',
      account_status: 'INACTIVE',
      college_register: faker.string.alphanumeric(6),
    });

    const updatedFullname = faker.person.fullName();
    const updatedUsername = faker.internet.userName();
    const updatedPassword = faker.internet.password();
    const updatedCollegeRegister = faker.string.alphanumeric(6);
    const updatedRole = 'ADMIN';
    const updatedStatus = 'ACTIVE';
    const updatedXpCount = 20;

    const { updatedUser } = await sut.execute({
      userId: userMock.id,
      fullname: updatedFullname,
      username: updatedUsername,
      password: updatedPassword,
      college_register: updatedCollegeRegister,
      user_role: updatedRole,
      account_status: updatedStatus,
      xp_count: updatedXpCount,
    });

    expect(updatedUser.id).toEqual(userMock.id);
    expect(updatedUser).not.toBeNull();
    expect(updatedUser.fullname).toBe(updatedFullname);
    expect(updatedUser.username).toBe(updatedUsername);
    expect(await compare(updatedPassword, updatedUser.password)).toBe(true);
    expect(updatedUser.user_role).toBe(updatedRole);
    expect(updatedUser.account_status).toBe(updatedStatus);
    expect(updatedUser.xp_count).toBe(updatedXpCount);
    expect(updatedUser.college_register).toBe(updatedCollegeRegister);
  });

  it('should not be able to update a user with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 1,
        fullname: faker.person.fullName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        college_register: faker.string.alphanumeric(6),
      })
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });
});
