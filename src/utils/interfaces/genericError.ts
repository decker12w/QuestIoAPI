import { ApiErrorHandler } from '@/utils/errors/ApiError/ApiErrorHandler';
import { FastifyError } from 'fastify';
export type KnownError = ApiErrorHandler | Error | unknown | FastifyError;
