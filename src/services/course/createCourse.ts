// services/user/createUser.ts
import { CourseRepository } from '@/repositories/courseRepository';
import { CourseAlreadyExistsError } from '../errors/CourseAlreadyExistsError';
import { inject, injectable } from 'tsyringe';
import { CreateCourseInput, CourseOutput } from '@/utils/schemas/course/courseSchema';

@injectable()
export class CreateCourseService {
  constructor(
    @inject('CourseRepository') private courseRepository: CourseRepository
  ) {}

  async execute({
    name,
    description,
  }: CreateCourseInput): Promise<CourseOutput> {

    const CourseWithSameName =
      await this.courseRepository.findByName(name);

    if (CourseWithSameName) {
      throw new CourseAlreadyExistsError();
    }

    const course = await this.courseRepository.create({
      name,
      description
    });

    return course;
  }
}
