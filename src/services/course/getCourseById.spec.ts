import 'reflect-metadata';
import { InMemoryCourseRepository } from '@/repositories/InMemoryRepository/InMemoryCourseRepositary';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetCourseByIdService } from './getCourseById';
import { faker } from '@faker-js/faker';
import { CourseNotFoundError } from '../@errors/CourseNotFound';

let CourseRepository: InMemoryCourseRepository;
let sut: GetCourseByIdService;

describe('Find Course By Id Service', () => {
  beforeEach(() => {
    CourseRepository = new InMemoryCourseRepository();
    sut = new GetCourseByIdService(CourseRepository);
  });

  it('should be able to find a Course by id', async () => {
    const CourseMock = await CourseRepository.create({
        name: faker.lorem.word(2),
        description: faker.lorem.sentence(),
    });

    const Course = await sut.execute({ id: CourseMock.id });

    expect(Course.id).toEqual(CourseMock.id);
  });

  it('should not be able to get Course with wrong id', async () => {
    await expect(() => sut.execute({ id: 1 })).rejects.toBeInstanceOf(
      CourseNotFoundError
    );
  });
});
