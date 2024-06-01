import { UsersRepository } from '@/repositories/usersRepository';
import { UserNotFoundError } from '../errors/UserNotFoundError';
import { AccountStatus, User, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

interface UpdateUserServiceRequest {
  userId: number;
  fullname?: string;
  username?: string;
  password?: string;
  college_register?: string;
  user_role?: UserRole;
  account_status?: AccountStatus;
  xp_count?: number;
}

interface UpdateUserServiceResponse {
  updatedUser: User;
}

@injectable()
export class UpdateUserByIdService {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
    fullname,
    username,
    password,
    college_register,
    user_role,
    account_status,
    xp_count,
  }: UpdateUserServiceRequest): Promise<UpdateUserServiceResponse> {
    const updatedUser = await this.usersRepository.findById(userId);

    if (!updatedUser) {
      throw new UserNotFoundError();
    }

    updatedUser.fullname = fullname ?? updatedUser.fullname;
    updatedUser.username = username ?? updatedUser.username;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 6);
      updatedUser.password = hashedPassword;
    }

    updatedUser.account_status = account_status ?? updatedUser.account_status;
    updatedUser.user_role = user_role ?? updatedUser.user_role;
    updatedUser.xp_count = xp_count ?? updatedUser.xp_count;
    updatedUser.college_register =
      college_register ?? updatedUser.college_register;

    await this.usersRepository.update(userId, updatedUser);

    return { updatedUser };
  }
}
