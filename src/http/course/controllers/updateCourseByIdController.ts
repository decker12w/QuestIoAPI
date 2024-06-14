import { CourseNotFoundError } from '@/services/@errors/CourseNotFound';
import { UpdateCourseByIdService } from '@/services/course/updateCourseByIdService';
import {
  ParamsIdInput,
  UpdateCourseInput,
  paramsIdSchema,
} from '@/utils/schemas/course/courseSchema';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';

// Definir a interface para os parâmetros da rota
@injectable()
export class UpdateCourseByIdController {
  constructor(
    @inject('UpdateCourseByIdService')
    private updateCourseByIdService: UpdateCourseByIdService
  ) {}

  async handle(
    request: FastifyRequest<{
      Body: UpdateCourseInput;
      Params: ParamsIdInput;
    }>,
    reply: FastifyReply
  ) {
    const data = request.body;

    const { id } = paramsIdSchema.parse(request.params);

    try {
      const Course = await this.updateCourseByIdService.execute({ id, ...data });
      return reply.status(200).send(Course);
    } catch (error) {
      if (error instanceof CourseNotFoundError) {
        return reply.status(404).send({ message: error.message });
      }
      throw error;
    }
  }
}
