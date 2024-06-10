import { UsersRepository } from '@/repositories/usersRepository';
import { AuthenticateInput, UserOutput } from '@/utils/schemas/user/userSchema';
import { injectable, inject } from 'tsyringe';
import { HashPassword } from '@/utils/interfaces/HashPassword';
import { InvalidCredencialsError } from '../errors/InvalidCredencials';
import { User } from '@prisma/client';

@injectable()
export class AuthenticateService {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
    @inject('HashPassword') private hashPassword: HashPassword
  ) {}

  async execute({ email, password }: AuthenticateInput): Promise<UserOutput> {
    const user = await this.ensureEmailExists(email);

    await this.ensurePasswordMatches(password, user.password);

    return user;
  }

  async ensureEmailExists(email: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredencialsError();
    }
    return user;
  }

  async ensurePasswordMatches(
    password: string,
    hashedPassword: string
  ): Promise<void> {
    const doesPasswordMatch = await this.hashPassword.compare(
      password,
      hashedPassword
    );

    if (!doesPasswordMatch) {
      throw new InvalidCredencialsError();
    }
  }
}
