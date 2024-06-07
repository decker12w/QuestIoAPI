import { UsersRepository } from '@/repositories/usersRepository';
import { UserNotFoundError } from '../errors/UserNotFoundError';
import { inject, injectable } from 'tsyringe';
import { ParamsIdInput, UserOutput } from '@/utils/schemas/user/userSchema';

@injectable()
export class DeleteUserByIdService {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository
  ) {}

  async execute({ id }: ParamsIdInput): Promise<UserOutput> {
    const user = await this.findUserById(id);
    await this.usersRepository.delete(id);

    return user;
  }

  private async findUserById(id: number) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
