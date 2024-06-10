import { $errorsRef } from '@/utils/schemas/user/errorsSchema';
import { $ref } from '@/utils/schemas/user/userSchema';

export const updateUserByIdDocs = {
  schema: {
    tags: ['Users'],
    params: $ref('paramsIdSchema'),
    body: $ref('updateUserBodySchema'),
    response: {
      204: {
        type: 'null', // Especifica que a resposta é nula para o status 204
        description: 'No Content',
      },
      404: $errorsRef('UserNotFoundErrorSchema'),
      400: $errorsRef('ValidationErrorSchema'),
      500: $errorsRef('InternalServerErrorSchema'),
    },
  },
};
