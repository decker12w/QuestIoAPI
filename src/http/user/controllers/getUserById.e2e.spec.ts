import 'reflect-metadata';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { faker } from '@faker-js/faker';

describe('Get User By Id Controller', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it('should be able to get a user by id', async () => {
    const userMock = {
      fullname: faker.person.fullName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      college_register: faker.string.alphanumeric(6),
      user_role: 'USER',
      account_status: 'ACTIVE',
    };
    await request(app.server).post('/user/create').send(userMock);

    const getResponse = await request(app.server).get('/user/1').send();

    expect(getResponse.statusCode).toEqual(200);
    expect(getResponse.body).toEqual(
      expect.objectContaining({
        username: userMock.username,
        email: userMock.email,
      })
    );
  });
});
