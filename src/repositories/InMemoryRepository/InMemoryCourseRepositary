import { Prisma, Course} from '@prisma/client';
import { CourseRepository } from '../courseRepository';

export class InMemoryCourseRepository implements CourseRepository {
  public items: Course[] = [];
  public nextId = 1;

  async create(data: Prisma.CourseCreateInput) {
    const course: Course = {
      id: this.nextId,
      name: data.name,
      description: data.description,
    };

    this.items.push(course);
    this.nextId++;

    return course;
  }

  async findById(id: number) {
    const course = this.items.find((item) => item.id === id);

    if (!course) {
      return null;
    }

    return course;
  }

  async delete(id: number) {
    const courseIndex = this.items.findIndex((item) => item.id === id);

    if (courseIndex === -1) {
      return null;
    }

    const deletedUser = this.items[courseIndex];
    this.items.splice(courseIndex, 1); // Remove the user from the array

    return deletedUser;
  }

  async update(id: number, data: Prisma.CourseUpdateInput) {
    const courseIndex = this.items.findIndex((item) => item.id === id);

    if (courseIndex === -1) {
      return null;
    }

    const course = this.items[courseIndex];

    if (data.name && typeof data.name === 'string') {
      course.name = data.name;
    }
    if (data.description && typeof data.description === 'string') {
      course.description = data.description;
    }

    this.items[courseIndex] = course;
    return course;
  }

  async findByName(name: string) {
    const course = this.items.find((item) => item.name === name);

    if (!course) {
      return null;
    }

    return course;
  }
}
