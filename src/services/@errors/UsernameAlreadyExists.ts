import { ApiErrorHandler } from '../../utils/errors/ApiError/ApiErrorHandler';

export class UsernameAlreadyExistsError extends ApiErrorHandler {
  constructor(details?: string) {
    super({
      statusCode: 409,
      errorCode: 'USERNAME_ALREADY_EXISTS',
      message: 'The username already exists.',
      details,
    });
  }
}

// Outros erros personalizados podem ser definidos da mesma forma
