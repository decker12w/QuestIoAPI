import { ApiErrorHandler } from '../../utils/errors/ApiError/ApiErrorHandler';

export class InvalidCredencialsError extends ApiErrorHandler {
  constructor(details?: string) {
    super({
      statusCode: 400,
      errorCode: 'INVALID_CREDENCIALS',
      message: 'Invalid credencials.',
      details,
    });
  }
}
