// Seu código TypeScript
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { CourseRepository } from '../courseRepository';

export class PrismaCourseRepository implements CourseRepository {
  findByName(name: string) {
    return prisma.course.findFirst({
      where: { name },
    });
  }
  // Aqui somente voltará o primeiro course achado, porém não consegui ainda implementar para achar vários (findmany)

  findById(id: number) {
    return prisma.course.findUnique({
      where: { id },
    });
  }

  delete(id: number) {
    return prisma.course.delete({
      where: { id },
    });
  }

  update(id: number, data: Prisma.CourseUpdateInput) {
    return prisma.course.update({
      where: { id },
      data,
    });
  }
  async create(data: Prisma.CourseCreateInput) {
    const course = await prisma.course.create({
      data,
    });
    return course;
  }
}
