// In '@/utils/docs/swagger/usersDocs.ts/createUser.ts'
import { $errorsRef } from '@/utils/schemas/user/errorsSchema';
import { $ref } from '@/utils/schemas/user/userSchema';

export const createUserDocs = {
  body: $ref('createUserBodySchema'),
  tags: ['Auth'],
  response: {
    201: $ref('UserResponseSchema'),
    409: {
      type: 'object',
      oneOf: [
        $errorsRef('EmailAlreadyExistsErrorSchema'),
        $errorsRef('UsernameAlreadyExistsErrorSchema'),
      ],
    },
    400: $errorsRef('ValidationErrorSchema'),
    500: $errorsRef('InternalServerErrorSchema'),
  },
};
