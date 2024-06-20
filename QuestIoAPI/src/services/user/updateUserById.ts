import { UsersRepository } from '@/repositories/usersRepository';
import { UserNotFoundError } from '../@errors/UserNotFound';
import { inject, injectable } from 'tsyringe';
import { UpdateUserService, UserOutput } from '@/utils/schemas/user/userSchema';
import { HashPassword } from '@/utils/interfaces/HashPassword';

@injectable()
export class UpdateUserByIdService {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
    @inject('HashPassword') private hashPassword: HashPassword
  ) {}

  async execute(updateData: UpdateUserService): Promise<UserOutput> {
    const {
      id,
      fullname,
      username,
      email,
      password,
      college_register,
      user_role,
      account_status,
      xp_count,
    } = updateData;
    const user = await this.findUserById(id);

    await this.updateUserFields(user, {
      fullname,
      username,
      email,
      password,
      college_register,
      user_role,
      account_status,
      xp_count,
    });
    await this.usersRepository.update(id, user);

    return user;
  }

  private async findUserById(id: number) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }

  private async updateUserFields(
    user: UserOutput,
    updateData: Partial<UpdateUserService>
  ): Promise<void> {
    const {
      fullname,
      username,
      email,
      password,
      college_register,
      user_role,
      account_status,
      xp_count,
    } = updateData;

    user.fullname = fullname ?? user.fullname;
    user.username = username ?? user.username;
    user.email = email ?? user.email;

    if (password) {
      user.password = await this.hashPassword.hash(password);
    }

    user.account_status = account_status ?? user.account_status;
    user.user_role = user_role ?? user.user_role;
    user.xp_count = xp_count ?? user.xp_count;
    user.college_register = college_register ?? user.college_register;
  }
}
