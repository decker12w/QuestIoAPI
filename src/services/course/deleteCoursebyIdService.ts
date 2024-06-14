import { CourseRepository } from '@/repositories/courseRepository';
import { CourseNotFoundError } from '../@errors/CourseNotFound';
import { inject, injectable } from 'tsyringe';
import {
  ParamsIdInput,
  CourseOutput,
} from '@/utils/schemas/course/courseSchema';

@injectable()
export class DeleteCourseByIdService {
  constructor(
    @inject('CourseRepository') private courseRepository: CourseRepository
  ) {}

  async execute({ id }: ParamsIdInput): Promise<CourseOutput> {
    const course = await this.courseRepository.findById(id);

    if (!course) {
      throw new CourseNotFoundError();
    }

    await this.courseRepository.delete(id);

    return course;
  }
}
