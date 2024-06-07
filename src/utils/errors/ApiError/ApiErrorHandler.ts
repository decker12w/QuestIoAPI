import { ApiErrorHandlerOptions } from '@/utils/interfaces/ApiErrorHandlerOptions';
import { KnownError } from '@/utils/interfaces/genericError';
import { FastifyReply } from 'fastify';

export class ApiErrorHandler extends Error {
  public statusCode: number;
  public errorCode: string;
  public details?: string;

  constructor({
    statusCode,
    errorCode,
    message,
    details,
  }: ApiErrorHandlerOptions) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  private handleError(reply: FastifyReply, error: KnownError) {
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
}
