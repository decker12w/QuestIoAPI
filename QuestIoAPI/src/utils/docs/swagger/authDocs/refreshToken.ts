import { $errorsAuthRef } from '@/utils/schemas/auth/errorsSchema';
import { $errorsRefreshTokenRef } from '@/utils/schemas/refreshToken/errorsSchema';
import { $errorsRef } from '@/utils/schemas/user/errorsSchema';

import { $ref } from '@/utils/schemas/user/userSchema';

export const refreshTokenDocs = {
  tags: ['Auth'],
  response: {
    200: $ref('tokenSchema'),
    401: {
      type: 'object',
      oneOf: [
        $errorsAuthRef('unauthorizedErrorSchema'),
        $errorsRefreshTokenRef('InvalidTokenErrorSchema'),
      ],
    },
    500: $errorsRef('InternalServerErrorSchema'),
  },
};
