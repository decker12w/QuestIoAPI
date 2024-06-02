import 'reflect-metadata';
import fastify from 'fastify';
import { env } from './env';
import { userRoutes } from './http/user/user.routes';
import { userSchemas } from './utils/schemas/user/userSchema';
import { errorsSchemas } from './utils/schemas/user/errorsSchema';

const app = fastify({
  ajv: {
    customOptions: {
      coerceTypes: false,
    },
  },
});

// Swagger
app.register(import('@fastify/swagger'), {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'QuestIon API Backend - Node.js',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    tags: [
      { name: 'Users', description: 'User related end-points' },
      { name: 'Courses', description: 'Courses related end-points' },
    ],
    components: {
      securitySchemes: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header',
        },
      },
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
  },
});

app.register(import('@fastify/swagger-ui'), {
  routePrefix: '/docs',
});

// Adição dos schemas
const allSchemas = [...userSchemas, ...errorsSchemas];
for (const schema of allSchemas) {
  app.addSchema(schema);
}

// Registro das rotas
app.register(userRoutes, { prefix: '/user' });

// Tratamento de erros
app.setErrorHandler((error, _, reply) => {
  console.log('Erro capturado:', error);
  if (error.validation) {
    return reply.status(400).send({
      statusCode: 400,
      errorCode: 'VALIDATION_ERROR',
      message: 'Validation error.',
      details: error.validation.map((error) => error.message),
    });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }
  return reply.status(500).send({
    statusCode: 500,
    errorCode: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error.',
  });
});

export { app };
