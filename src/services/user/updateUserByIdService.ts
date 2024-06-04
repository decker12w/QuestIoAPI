import { UsersRepository } from '@/repositories/usersRepository';
import { UserNotFoundError } from '../errors/UserNotFoundError';
import bcrypt from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { UpdateUserService, UserOutput } from '@/utils/schemas/user/userSchema';

@injectable()
export class UpdateUserByIdService {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository
  ) {}

  async execute({
    id,
    fullname,
    username,
    email,
    password,
    college_register,
    user_role,
    account_status,
    xp_count,
  }: UpdateUserService): Promise<UserOutput> {
    const updatedUser = await this.usersRepository.findById(id);

    if (!updatedUser) {
      throw new UserNotFoundError();
    }

    updatedUser.fullname = fullname ?? updatedUser.fullname;
    updatedUser.username = username ?? updatedUser.username;
    updatedUser.email = email ?? updatedUser.email;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 6);
      updatedUser.password = hashedPassword;
    }

    updatedUser.account_status = account_status ?? updatedUser.account_status;
    updatedUser.user_role = user_role ?? updatedUser.user_role;
    updatedUser.xp_count = xp_count ?? updatedUser.xp_count;
    updatedUser.college_register =
      college_register ?? updatedUser.college_register;

    await this.usersRepository.update(id, updatedUser);

    return updatedUser;
  }
}
