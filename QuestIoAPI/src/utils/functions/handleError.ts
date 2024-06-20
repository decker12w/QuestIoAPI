import { FastifyReply } from 'fastify';
import { KnownError } from '../interfaces/genericError';
import { ApiErrorHandler } from '../errors/ApiError/ApiErrorHandler';

export function handleError(reply: FastifyReply, error: KnownError) {
  if (error instanceof ApiErrorHandler) {
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      errorCode: error.errorCode,
      message: error.message,
      details: error.details,
    });
  }
  throw error;
}
