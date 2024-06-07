import { ApiErrorHandler } from '../../utils/errors/ApiError/ApiErrorHandler';

export class ResourceNotFoundError extends ApiErrorHandler {
  constructor(details?: string) {
    super({
      statusCode: 404,
      errorCode: 'RESOURCE_NOT_FOUND',
      message: 'Resource not found.',
      details,
    });
  }
}
