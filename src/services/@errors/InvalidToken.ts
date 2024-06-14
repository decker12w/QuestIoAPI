import { ApiErrorHandler } from '../../utils/errors/ApiError/ApiErrorHandler';

export class InvalidTokenError extends ApiErrorHandler {
  constructor(details?: string) {
    super({
      statusCode: 401,
      errorCode: 'INVALID_TOKEN',
      message: 'Invalid token.',
      details,
    });
  }
}
