import { Prisma, User } from '@prisma/client';

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  delete(id: number): Promise<User | null>;
  update(id: number, data: Prisma.UserUpdateInput): Promise<User | null>;
}
