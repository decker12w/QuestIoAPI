import { $errorsRef } from '@/utils/schemas/user/errorsSchema';
import { $ref } from '@/utils/schemas/user/userSchema';

export const authenticateDocs = {
  body: $ref('authenticateInputSchema'),
  tags: ['Auth'],
  response: {
    200: $ref('tokenSchema'),
    400: {
      type: 'object',
      oneOf: [
        $errorsRef('InvalidCredencialsErrorSchema'),
        $errorsRef('ValidationErrorSchema'),
      ],
    },
    500: $errorsRef('InternalServerErrorSchema'),
  },
};
