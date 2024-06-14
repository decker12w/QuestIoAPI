import { CourseNotFoundError } from '@/services/errors/CourseNotFoundError';
import { GetCourseByIdService } from '@/services/course/getCourseById';
import { ParamsIdInput, paramsIdSchema } from '@/utils/schemas/course/courseSchema';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetCourseByIdController {
  constructor(
    @inject('GetCourseByIdService') private getCourseByIdService: GetCourseByIdService
  ) {}

  async handle(
    request: FastifyRequest<{ Params: ParamsIdInput }>,
    reply: FastifyReply
  ) {
    const { id } = paramsIdSchema.parse(request.params);

    try {
      const Course = await this.getCourseByIdService.execute({ id });
      return reply.status(200).send(Course);
    } catch (error) {
      if (error instanceof CourseNotFoundError) {
        return reply.status(404).send({ message: error.message });
      }
      throw error;
    }
  }
}
