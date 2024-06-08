import 'reflect-metadata';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { faker } from '@faker-js/faker';

describe('Update User By Id Controller', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it('should be able to update a user by id', async () => {
    const userMock = {
      fullname: faker.person.fullName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      college_register: faker.string.alphanumeric(6),
      user_role: 'USER',
      xp_count: 10,
      account_status: 'ACTIVE',
    };

    const updatedUser = {
      fullname: faker.person.fullName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      college_register: faker.string.alphanumeric(6),
      user_role: 'USER',
      xp_count: 100,
      account_status: 'ACTIVE',
    };

    await request(app.server).post('/user/create').send(userMock);

    const updateResponse = await request(app.server)
      .put('/user/update/1')
      .send(updatedUser);

    expect(updateResponse.statusCode).toEqual(204);
    expect(updateResponse.body.user).toBeUndefined();
  });
});
