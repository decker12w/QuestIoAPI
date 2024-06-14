import { UsersRepository } from '@/repositories/usersRepository';
import { UserNotFoundError } from '../@errors/UserNotFound';
import { inject, injectable } from 'tsyringe';
import { ParamsIdInput } from '@/utils/schemas/user/userSchema';

@injectable()
export class DeleteUserByIdService {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository
  ) {}

  async execute({ id }: ParamsIdInput): Promise<void> {
    await this.findUserById(id);
    await this.usersRepository.delete(id);
  }

  private async findUserById(id: number) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
