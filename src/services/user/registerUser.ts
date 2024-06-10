// services/user/createUser.ts
import { UserRole, AccountStatus } from '@prisma/client';
import { UsersRepository } from '@/repositories/usersRepository';
import { UsernameAlreadyExistsError } from '../errors/UsernameAlreadyExists';
import { EmailAlreadyExistsError } from '../errors/EmailAlreadyExists'; // Novo erro para email
import { inject, injectable } from 'tsyringe';
import { CreateUserInput, UserOutput } from '@/utils/schemas/user/userSchema';
import { HashPassword } from '@/utils/interfaces/HashPassword';

@injectable()
export class RegisterUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
    @inject('HashPassword') private hashPassword: HashPassword
  ) {}

  async execute(input: CreateUserInput): Promise<UserOutput> {
    const {
      fullname,
      username,
      email,
      password,
      college_register,
      user_role = UserRole.USER,
      account_status = AccountStatus.ACTIVE,
    } = input;

    await this.ensureUsernameDoesNotExist(username);
    await this.ensureEmailDoesNotExist(email);

    const password_hash = await this.hashPassword.hash(password);

    const user = await this.usersRepository.create({
      fullname,
      username,
      email,
      password: password_hash,
      college_register,
      user_role,
      account_status,
    });

    return user;
  }

  private async ensureUsernameDoesNotExist(username: string): Promise<void> {
    const userWithSameUsername =
      await this.usersRepository.findByUsername(username);
    if (userWithSameUsername) {
      throw new UsernameAlreadyExistsError();
    }
  }

  private async ensureEmailDoesNotExist(email: string): Promise<void> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new EmailAlreadyExistsError();
    }
  }
}
