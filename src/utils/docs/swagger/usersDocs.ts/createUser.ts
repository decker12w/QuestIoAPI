import { $errorsRef } from '@/utils/schemas/user/errorsSchema';
import { $ref } from '@/utils/schemas/user/userSchema';

export const createUserDocs = {
  schema: {
    body: $ref('authenticateInputSchema'),
    tags: ['Users'],
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
  },
};
