import { ApiErrorHandler } from '@/utils/errors/ApiError/ApiErrorHandler';
export type KnownError = ApiErrorHandler | Error | unknown;
