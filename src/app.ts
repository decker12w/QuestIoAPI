import 'reflect-metadata';
import '@/lib/container/containerUsers';
import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import { userRoutes } from './http/user/user.routes';

const app = fastify();

// Registro das rotas
app.register(userRoutes, { prefix: '/user' });

// Tratamento de erros
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }
  return reply.status(500).send({
    message: 'Internal server error.',
  });
});

export { app };
