import { FastifyInstance } from 'fastify';

export async function swaggerDocumentation(app: FastifyInstance) {
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
        { name: 'Auth', description: 'Auth related end-points' },
        { name: 'Users', description: 'User related end-points' },
        { name: 'Courses', description: 'Courses related end-points' },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            description:
              'RSA256 JWT signed by private key, with username in payload',
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
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
}
