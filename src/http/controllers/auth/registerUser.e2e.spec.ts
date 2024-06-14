import 'reflect-metadata';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { faker } from '@faker-js/faker';

describe('Register User Controller e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it('should be able to register a user', async () => {
    const response = await request(app.server)
      .post('/auth/register')
      .send({
        fullname: faker.person.fullName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        college_register: faker.string.alphanumeric(6),
        user_role: 'USER',
        account_status: 'ACTIVE',
      });

    expect(response.statusCode).toEqual(201);
  });
});
