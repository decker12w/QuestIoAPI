// services/user/createUser.ts
import { User, UserRole, AccountStatus } from '@prisma/client';
import { UsersRepository } from '@/repositories/usersRepository';
import { UsernameAlreadyExistsError } from '../errors/UsernameAlreadyExistsError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

interface CreateUserServiceRequest {
  fullname: string;
  username: string;
  password: string;
  college_register: string;
  user_role?: UserRole;
  entry_type?: Date;
  account_status?: AccountStatus;
  xp_count?: number;
}

interface CreateUserServiceResponse {
  user: User;
}
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
    entry_type = new Date(),
    account_status = AccountStatus.ACTIVE,
    xp_count = 0,
  }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
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
      entry_type,
      account_status,
      xp_count,
    });

    return { user };
  }
}
