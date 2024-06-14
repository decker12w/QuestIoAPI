import { ApiErrorHandlerOptions } from '@/utils/interfaces/ApiErrorHandlerOptions';

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
}
