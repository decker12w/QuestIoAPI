import { ApiErrorHandler } from '../../utils/errors/ApiError/ApiErrorHandler';

export class EmailAlreadyExistsError extends ApiErrorHandler {
  constructor(details?: string) {
    super({
      statusCode: 409,
      errorCode: 'EMAIL_ALREADY_EXISTS',
      message: 'The email already exists.',
      details,
    });
  }
}
