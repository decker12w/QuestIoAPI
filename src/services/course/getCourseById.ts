import { CourseRepository } from '@/repositories/courseRepository';
import { CourseNotFoundError } from '../@errors/CourseNotFound';
import { inject, injectable } from 'tsyringe';
import {
  ParamsIdInput,
  CourseOutput,
} from '@/utils/schemas/course/courseSchema';

@injectable()
export class GetCourseByIdService {
  constructor(
    @inject('CoursesRepository') private CoursesRepository: CourseRepository
  ) {}

  async execute({ id }: ParamsIdInput): Promise<CourseOutput> {
    const Course = await this.CoursesRepository.findById(id);

    if (!Course) {
      throw new CourseNotFoundError();
    }

    return Course;
  }
}
