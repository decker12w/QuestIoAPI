import 'reflect-metadata';
import { InMemoryCourseRepository } from '@/repositories/InMemoryRepository/InMemoryCourseRepositary';
import { beforeEach, describe, expect, it } from 'vitest';
import { UpdateCourseByIdService } from './updateCourseByIdService';
import { faker } from '@faker-js/faker';
import { CourseNotFoundError } from '../errors/CourseNotFoundError';

let CoursesRepository: InMemoryCourseRepository;
let sut: UpdateCourseByIdService;

describe('Update Course Service', () => {
  beforeEach(() => {
    CoursesRepository = new InMemoryCourseRepository();
    sut = new UpdateCourseByIdService(CoursesRepository);
  });

  it('should be able to update a Course', async () => {
    const CourseMock = await CoursesRepository.create({
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
    });

    const updatedName = faker.lorem.word(2);
    const updatedDescription = faker.lorem.sentence();

    const updatedCourse = await sut.execute({
      id: CourseMock.id,
      name: updatedName,
      description: updatedDescription
    });

    expect(updatedCourse.id).toEqual(CourseMock.id);
    expect(updatedCourse).not.toBeNull();
    expect(updatedCourse.name).toBe(updatedName);
    expect(updatedCourse.description).toBe(updatedDescription);
  });

  it('should not be able to update a Course with wrong id', async () => {
    await expect(() =>
      sut.execute({
        id: 1,
        name: faker.lorem.word(2),
        description: faker.lorem.sentence(),
      })
    ).rejects.toBeInstanceOf(CourseNotFoundError);
  });
});
