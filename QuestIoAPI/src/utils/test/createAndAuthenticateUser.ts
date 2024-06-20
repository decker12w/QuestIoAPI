import { faker } from '@faker-js/faker';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

interface UserInformation {
  token: string;
  email: string;
  password: string;
  username: string;
  fullname: string;
}
export async function createAndAuthenticateUser(
  app: FastifyInstance
): Promise<UserInformation> {
  const email = faker.internet.email();
  const password = faker.internet.password();
  const username = faker.internet.userName();
  const fullname = faker.person.fullName();
  // Register a new user
  await request(app.server)
    .post('/auth/register')
    .send({
      fullname,
      username,
      email,
      password,
      college_register: faker.string.alphanumeric(6),
      user_role: 'USER',
      account_status: 'ACTIVE',
    });

  // Authenticate the user with the same email and password
  const authResponse = await request(app.server).post('/auth/signin').send({
    email: email,
    password: password,
  });

  const { token } = authResponse.body;
  return {
    token: token,
    email: email,
    password: password,
    username: username,
    fullname: email,
  };
}
