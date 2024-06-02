// services/user/createUser.ts
import { UserRole, AccountStatus } from '@prisma/client';
import { UsersRepository } from '@/repositories/usersRepository';
import { UsernameAlreadyExistsError } from '../errors/UsernameAlreadyExistsError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { CreateUserInput, UserOutput } from '@/utils/schemas/user/userSchema';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository
  ) {}

  async execute({
    fullname,
    username,
    password,
    college_register,
    user_role = UserRole.USER,
    account_status = AccountStatus.ACTIVE,
  }: CreateUserInput): Promise<UserOutput> {
    const password_hash = await hash(password, 6);

    const userWithSameUsername =
      await this.usersRepository.findByUsername(username);

    if (userWithSameUsername) {
      throw new UsernameAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      fullname,
      username,
      password: password_hash,
      college_register,
      user_role,
      account_status,
    });

    return user;
  }
}
