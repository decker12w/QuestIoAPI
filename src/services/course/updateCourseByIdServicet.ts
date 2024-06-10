import { CourseRepository } from '@/repositories/courseRepository';
import { CourseNotFoundError } from '../errors/CourseNotFound';
import { inject, injectable } from 'tsyringe';
import {
  UpdateCourseService,
  CourseOutput,
} from '@/utils/schemas/course/courseSchema';

@injectable()
export class UpdateCourseByIdService {
  constructor(
    @inject('CourseRepository') private CourseRepository: CourseRepository
  ) {}

  async execute({
    id,
    name,
    description,
  }: UpdateCourseService): Promise<CourseOutput> {
    const updatedCourse = await this.CourseRepository.findById(id);

    if (!updatedCourse) {
      throw new CourseNotFoundError();
    }

    updatedCourse.description = description ?? updatedCourse.description;
    updatedCourse.name = name ?? updatedCourse.name;

    await this.CourseRepository.update(id, updatedCourse);

    return updatedCourse;
  }
}
