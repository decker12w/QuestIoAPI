import { UsersRepository } from '@/repositories/usersRepository';
import { User } from '@prisma/client';
import { UserNotFoundError } from '../errors/UserNotFoundError';
import { inject, injectable } from 'tsyringe';

interface FindUserByIdServiceRequest {
  userId: number;
}

interface FindUserByIdServiceResponse {
  user: User;
}
@injectable()
export class GetUserByIdService {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository
  ) {}

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
