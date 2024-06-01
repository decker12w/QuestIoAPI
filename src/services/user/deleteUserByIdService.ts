import { UsersRepository } from '@/repositories/usersRepository';
import { User } from '@prisma/client';
import { UserNotFoundError } from '../errors/UserNotFoundError';

interface DeleteUserServiceRequest {
  userId: number;
}

interface DeleteUserServiceResponse {
  user: User;
}

export class DeleteUserByIdService {
  constructor(private usersRepository: UsersRepository) {}

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
