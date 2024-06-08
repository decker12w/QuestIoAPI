import 'reflect-metadata';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { faker } from '@faker-js/faker';

describe('Delete User By Id Controller', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it('should be able to delete a user by id', async () => {
    await request(app.server)
      .post('/user/create')
      .send({
        fullname: faker.person.fullName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        college_register: faker.string.alphanumeric(6),
        user_role: 'USER',
        account_status: 'ACTIVE',
      });

    const deleteResponse = await request(app.server)
      .delete('/user/delete/1')
      .send();

    expect(deleteResponse.statusCode).toEqual(204);
    expect(deleteResponse.body.user).toBeUndefined();
  });
});
