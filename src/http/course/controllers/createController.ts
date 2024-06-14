// http/Course/controllers/createController.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateCourseService } from '@/services/course/createCourse';
import { CourseAlreadyExistsError } from '@/services/errors/CourseAlreadyExistsError';
import { inject, injectable } from 'tsyringe';
import { CreateCourseInput } from '@/utils/schemas/course/courseSchema';

@injectable()
export class CreateCourseController {
  constructor(
    @inject('CreateCourseService') private createCourseService: CreateCourseService
  ) {}

  async handle(
    request: FastifyRequest<{ Body: CreateCourseInput }>,
    reply: FastifyReply
  ) {
    const data = request.body;

    try {
      const Course = await this.createCourseService.execute(data);

      return reply.status(201).send(Course);
    } catch (error) {
      if (error instanceof CourseAlreadyExistsError) {
        return reply.status(409).send({
          statusCode: 409,
          errorCode: 'COURSE_ALREADY_EXISTS',
          message: 'The Course already exists.',
          details: error.message,
        });
      }
      throw error;
    }
  }
}
