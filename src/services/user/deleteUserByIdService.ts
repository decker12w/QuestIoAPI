import { UsersRepository } from '@/repositories/usersRepository';
import { User } from '@prisma/client';
import { UserNotFoundError } from '../errors/UserNotFoundError';
import { inject, injectable } from 'tsyringe';

interface DeleteUserServiceRequest {
  userId: number;
}

interface DeleteUserServiceResponse {
  user: User;
}
@injectable()
export class DeleteUserByIdService {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
  }: DeleteUserServiceRequest): Promise<DeleteUserServiceResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    await this.usersRepository.delete(userId);

    return { user };
  }
}
