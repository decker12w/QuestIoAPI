import 'reflect-metadata';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateCourseService } from './createCourse';
import { InMemoryCourseRepository } from '@/repositories/InMemoryRepository/InMemoryCourseRepositary';
import { faker } from '@faker-js/faker';
import { CourseAlreadyExistsError } from '../@errors/CourseAlreadyExists';
let CoursesRepository: InMemoryCourseRepository;
let sut: CreateCourseService;

describe('Create Course Service', () => {
  beforeEach(() => {
    CoursesRepository = new InMemoryCourseRepository();
    sut = new CreateCourseService(CoursesRepository);
  });

  it('should be able to create a Course', async () => {
    const Course = await sut.execute({
      name: faker.lorem.words(2),
      description: faker.lorem.sentence()
    });

    expect(Course.id).toEqual(expect.any(Number));
  });

  it('should not be able to create a Course with an already existing the same Course', async () => {
    const name = faker.lorem.words(2);
    const description =  faker.lorem.sentence();

    await CoursesRepository.create({
      name,
      description,
    });

    await expect(
      sut.execute({
        name,
        description,
      })
    ).rejects.toThrowError(CourseAlreadyExistsError);
  });
});
