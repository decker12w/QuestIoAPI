import 'reflect-metadata';
import fastify from 'fastify';
import { userRoutes } from './http/routes/user.routes';
import { userSchemas } from './utils/schemas/user/userSchema';
import { errorsSchemas } from './utils/schemas/user/errorsSchema';
import { swaggerDocumentation } from './utils/docs/swagger/swaggerDocs';
import { errorHandler } from './utils/errors/ErrorHandler/globalErrorValidation';
import fastifyJwt from '@fastify/jwt';
import { env } from './env';

const app = fastify({
  ajv: {
    customOptions: {
      coerceTypes: false,
    },
  },
});

// Swagger
app.register(import('@fastify/swagger'), swaggerDocumentation);
app.register(import('@fastify/swagger-ui'), {
  routePrefix: '/docs',
});

// Adição dos schemas
const allSchemas = [...userSchemas, ...errorsSchemas];
for (const schema of allSchemas) {
  app.addSchema(schema);
}

//JWT
app.register(fastifyJwt, {
  secret: env.API_KEY,
});

// Registro das rotas
app.register(userRoutes, { prefix: '/user' });

// Tratamento de erros
app.setErrorHandler(errorHandler);

export { app };
