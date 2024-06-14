import { ApiErrorHandler } from '../../utils/errors/ApiError/ApiErrorHandler';

export class UserNotFoundError extends ApiErrorHandler {
  constructor(details?: string) {
    super({
      statusCode: 404,
      errorCode: 'USER_NOT_FOUND',
      message: 'User not found.',
      details,
    });
  }
}
