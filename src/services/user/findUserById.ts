import { UsersRepository } from '@/repositories/usersRepository';
import { User } from '@prisma/client';
import { UserNotFoundError } from '../errors/UserNotFoundError';

interface FindUserByIdServiceRequest {
  userId: number;
}

interface FindUserByIdServiceResponse {
  user: User;
}

export class FindUserByIdService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: FindUserByIdServiceRequest): Promise<FindUserByIdServiceResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    return { user };
  }
}
