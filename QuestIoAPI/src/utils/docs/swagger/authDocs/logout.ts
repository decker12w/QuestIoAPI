import { $authRef } from '@/utils/schemas/auth/authSchema';
import { $errorsAuthRef } from '@/utils/schemas/auth/errorsSchema';
import { $errorsRef } from '@/utils/schemas/user/errorsSchema';

export const logoutDocs = {
  tags: ['Auth'],
  response: {
    200: $authRef('logoutOutputSchema'),
    401: $errorsAuthRef('unauthorizedErrorSchema'),
    404: $errorsAuthRef('ResourceNotFoundErrorSchema'),
    500: $errorsRef('InternalServerErrorSchema'),
  },
};
