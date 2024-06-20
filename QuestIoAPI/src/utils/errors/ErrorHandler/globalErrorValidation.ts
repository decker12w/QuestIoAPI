// utils/errorHandler.js

import { env } from '@/env';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export function errorHandler(
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply
) {
  console.log('Erro capturado:', error);
  if (error.validation) {
    return reply.status(400).send({
      statusCode: 400,
      errorCode: 'VALIDATION_ERROR',
      message: 'Validation error.',
      details: error.validation.map((err) => err.message),
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
}
