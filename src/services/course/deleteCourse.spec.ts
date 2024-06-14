import 'reflect-metadata';
import { beforeEach, describe, expect, it } from 'vitest';
import { DeleteCourseByIdService } from './deleteCoursebyIdService';
import { InMemoryCourseRepository } from '@/repositories/InMemoryRepository/InMemoryCourseRepositary';
import { faker } from '@faker-js/faker';
import { CourseNotFoundError } from '../errors/CourseNotFoundError';

let CoursesRepository: InMemoryCourseRepository;
let sut: DeleteCourseByIdService;

describe('Delete Course Service ', () => {
  beforeEach(() => {
    CoursesRepository = new InMemoryCourseRepository();
    sut = new DeleteCourseByIdService(CoursesRepository);
  });

  it('should be able to delete a Course', async () => {
    const CourseMock = await CoursesRepository.create({
      name: faker.lorem.word(2),
      description: faker.lorem.sentence()
    });

    const Course = await sut.execute({ id: CourseMock.id });

    const deletedCourse = await CoursesRepository.findById(CourseMock.id);

    expect(deletedCourse).toBeNull();
    expect(Course).toEqual(CourseMock);
  });

  it('should not be able to delete a Course with wrong id', async () => {
    await expect(() => sut.execute({ id: 1 })).rejects.toBeInstanceOf(
      CourseNotFoundError,
    );
  });
});
