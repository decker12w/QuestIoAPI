import 'reflect-metadata';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser';

describe('Get User By Id Controller', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it('should be able to get a user by id', async () => {
    const { token, email, username } = await createAndAuthenticateUser(app);

    const getResponse = await request(app.server)
      .get('/user/1')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(getResponse.statusCode).toEqual(200);
    expect(getResponse.body).toEqual(
      expect.objectContaining({
        username: username,
        email: email,
      })
    );
  });
});
