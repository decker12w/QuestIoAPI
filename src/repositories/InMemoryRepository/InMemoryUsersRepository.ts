import { AccountStatus, Prisma, User, UserRole } from '@prisma/client';
import { UsersRepository } from '../usersRepository';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];
  public nextId = 1;

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: this.nextId,
      fullname: data.fullname,
      username: data.username,
      password: data.password,
      email: data.email,
      college_register: data.college_register,
      user_role: data.user_role ?? UserRole.USER,
      entry_type: new Date(),
      account_status: data.account_status ?? AccountStatus.ACTIVE,
      xp_count: data.xp_count ?? 0,
    };

    this.items.push(user);
    this.nextId++;

    return user;
  }

  async findById(id: number) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async delete(id: number) {
    const userIndex = this.items.findIndex((item) => item.id === id);

    if (userIndex === -1) {
      return null;
    }

    const deletedUser = this.items[userIndex];
    this.items.splice(userIndex, 1); // Remove the user from the array

    return deletedUser;
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    const userIndex = this.items.findIndex((item) => item.id === id);

    if (userIndex === -1) {
      return null;
    }

    const user = this.items[userIndex];

    if (data.fullname && typeof data.fullname === 'string') {
      user.fullname = data.fullname;
    }
    if (data.username && typeof data.username === 'string') {
      user.username = data.username;
    }
    if (data.password && typeof data.password === 'string') {
      user.password = data.password;
    }
    if(data.email && typeof data.email ==='string'){
      user.email = data.email;
    }
    if (data.college_register && typeof data.college_register === 'string') {
      user.college_register = data.college_register;
    }
    if (data.user_role && typeof data.user_role === 'string') {
      user.user_role = data.user_role as UserRole;
    }
    if (data.account_status && typeof data.account_status === 'string') {
      user.account_status = data.account_status as AccountStatus;
    }
    if (data.xp_count && typeof data.xp_count === 'number') {
      user.xp_count = data.xp_count;
    }

    this.items[userIndex] = user;
    return user;
  }

  async findByUsername(username: string) {
    const user = this.items.find((item) => item.username === username);

    if (!user) {
      return null;
    }

    return user;
  }
}
