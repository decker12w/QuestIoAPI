// Seu código TypeScript
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { UsersRepository } from '../usersRepository';

export class PrismaUsersRepository implements UsersRepository {
  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
  findByUsername(username: string) {
    return prisma.user.findUnique({
      where: { username },
    });
  }

  findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  delete(id: number) {
    return prisma.user.delete({
      where: { id },
    });
  }

  update(id: number, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }
}
