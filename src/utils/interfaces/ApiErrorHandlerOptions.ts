export interface ApiErrorHandlerOptions {
  statusCode: number;
  errorCode: string;
  message: string;
  details?: string;
}
