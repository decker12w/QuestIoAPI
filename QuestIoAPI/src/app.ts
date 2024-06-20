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
import fastifyCookie from '@fastify/cookie';
import { errorsAuthSchemas } from './utils/schemas/auth/errorsSchema';
import { errorsRefreshTokenSchemas } from './utils/schemas/refreshToken/errorsSchema';
import { authSchemas } from './utils/schemas/auth/authSchema';
import cors from '@fastify/cors';

const app = fastify({
  ajv: {
    customOptions: {
      coerceTypes: false,
    },
  },
});

// Modo de desenvolvimento
if (env.NODE_ENV === 'development') {
  console.log('Development mode');
}

// Swagger
swaggerDocumentation(app);

// Adição dos schemas
const allSchemas = [
  ...userSchemas,
  ...authSchemas,
  ...errorsSchemas,
  ...errorsAuthSchemas,
  ...errorsRefreshTokenSchemas,
];
for (const schema of allSchemas) {
  app.addSchema(schema);
}

//JWT
app.register(fastifyJwt, {
  secret: env.API_KEY,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
});
app.register(fastifyCookie);

//CORS
app.register(cors, {
  origin: ['*'],
});

//health check
app.get('/health', async () => {
  return { status: 'ok' };
});

// Registro das rotas
app.register(authRoutes, { prefix: '/auth' });
app.register(userRoutes, { prefix: '/user' });

// Tratamento de erros
app.setErrorHandler(errorHandler);

export { app };
