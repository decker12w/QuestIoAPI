// utils/docs/swaggerDocs.js
export const swaggerDocumentation = {
  swagger: {
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
};
