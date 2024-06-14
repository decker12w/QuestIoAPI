import { $authRef } from '@/utils/schemas/auth/authSchema';
import { $errorsAuthRef } from '@/utils/schemas/auth/errorsSchema';
import { $errorsRef } from '@/utils/schemas/user/errorsSchema';

import { $ref } from '@/utils/schemas/user/userSchema';

export const authenticateDocs = {
  body: $authRef('authenticateInputSchema'),
  tags: ['Auth'],
  response: {
    200: $ref('tokenSchema'),
    400: $errorsAuthRef('InvalidCredencialsErrorSchema'),
    500: $errorsRef('InternalServerErrorSchema'),
  },
};
