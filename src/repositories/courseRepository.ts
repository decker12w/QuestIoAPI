import { Prisma, Course } from '@prisma/client';

export interface CourseRepository{
    create(data: Prisma.CourseCreateInput):Promise<Course>;
    findById(id: number): Promise<Course | null>;
    findByName(name: string): Promise<Course | null>;
    delete(id: number): Promise<Course | null>;
    update(id: number, data: Prisma.CourseUpdateInput): Promise<Course | null>;
}