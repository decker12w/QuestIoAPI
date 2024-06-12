import 'reflect-metadata';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser';

describe('Delete User By Id Controller', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to delete a user by id', async () => {
    const { token } = await createAndAuthenticateUser(app);
    const deleteResponse = await request(app.server)
      .delete('/user/delete/1')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(deleteResponse.statusCode).toEqual(204);
    expect(deleteResponse.body.user).toBeUndefined();
  });
});
