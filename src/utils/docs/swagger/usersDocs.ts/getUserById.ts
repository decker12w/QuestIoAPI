import { $errorsRef } from '@/utils/schemas/user/errorsSchema';
import { $ref } from '@/utils/schemas/user/userSchema';

export const getUserByIdDocs = {
  schema: {
    tags: ['Users'],
    params: $ref('paramsIdSchema'),
    response: {
      200: $ref('UserResponseSchema'),
      404: $errorsRef('UserNotFoundErrorSchema'),
      500: $errorsRef('InternalServerErrorSchema'),
    },
  },
};
