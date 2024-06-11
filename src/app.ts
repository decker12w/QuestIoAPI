import 'reflect-metadata';
import fastify from 'fastify';
import { userRoutes } from './http/routes/user.routes';
import { userSchemas } from './utils/schemas/user/userSchema';
import { errorsSchemas } from './utils/schemas/user/errorsSchema';
import { errorHandler } from './utils/errors/ErrorHandler/globalErrorValidation';
import fastifyJwt from '@fastify/jwt';
import { env } from './env';
import { authRoutes } from './http/routes/auth.routes';
import { swaggerDocumentation } from './utils/docs/swagger/swaggerDocs';

const app = fastify({
  ajv: {
    customOptions: {
      coerceTypes: false,
    },
  },
});

// Swagger
swaggerDocumentation(app);

// Adição dos schemas
const allSchemas = [...userSchemas, ...errorsSchemas];
for (const schema of allSchemas) {
  app.addSchema(schema);
}

//JWT
app.register(fastifyJwt, {
  secret: env.API_KEY,
  sign: {
    expiresIn: '10m',
  },
});

// Registro das rotas
app.register(authRoutes, { prefix: '/auth' });
app.register(userRoutes, { prefix: '/user' });

// Tratamento de erros
app.setErrorHandler(errorHandler);

export { app };
