import { CourseNotFoundError } from '@/services/@errors/CourseNotFound';
import { DeleteCourseByIdService } from '@/services/course/deleteCoursebyIdService';
import { ParamsIdInput, paramsIdSchema } from '@/utils/schemas/course/courseSchema';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeleteCourseByIdController {
  constructor(
    @inject('DeleteCourseByIdService')
    private deleteCourseByIdService: DeleteCourseByIdService
  ) {}

  async handle(
    request: FastifyRequest<{ Params: ParamsIdInput }>,
    reply: FastifyReply
  ) {
    const { id } = paramsIdSchema.parse(request.params);

    try {
      await this.deleteCourseByIdService.execute({ id });
      return reply.status(204).send();
    } catch (error) {
      if (error instanceof CourseNotFoundError) {
        return reply.status(404).send({ message: error.message });
      }
      throw error;
    }
  }
}
