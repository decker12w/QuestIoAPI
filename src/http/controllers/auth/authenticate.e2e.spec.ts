import 'reflect-metadata';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { faker } from '@faker-js/faker';

describe('Authenticate Controller e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticate a user', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    // Register a new user
    await request(app.server)
      .post('/auth/register')
      .send({
        fullname: faker.person.fullName(),
        username: faker.internet.userName(),
        email: email,
        password: password,
        college_register: faker.string.alphanumeric(6),
        user_role: 'USER',
        account_status: 'ACTIVE',
      });

    // Authenticate the user with the same email and password
    const response = await request(app.server).post('/auth/signin').send({
      email: email,
      password: password,
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ token: expect.any(String) });
  });
});
