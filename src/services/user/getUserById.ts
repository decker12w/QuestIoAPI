import { UsersRepository } from '@/repositories/usersRepository';
import { UserNotFoundError } from '../errors/UserNotFoundError';
import { inject, injectable } from 'tsyringe';
import { ParamsIdInput, UserOutput } from '@/utils/schemas/user/userSchema';

@injectable()
export class GetUserByIdService {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository
  ) {}

  async execute({ id }: ParamsIdInput): Promise<UserOutput> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
