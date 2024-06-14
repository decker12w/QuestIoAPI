import { ApiErrorHandler } from '../../utils/errors/ApiError/ApiErrorHandler';

export class UnauthorizedError extends ApiErrorHandler {
  constructor(details?: string) {
    super({
      statusCode: 401,
      errorCode: 'UNAUTHORIZED',
      message: 'Unauthorized.',
      details,
    });
  }
}
