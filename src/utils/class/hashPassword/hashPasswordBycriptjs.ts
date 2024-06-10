import { HashPassword } from '@/utils/interfaces/HashPassword';
import { compare, hash } from 'bcryptjs';

export class HashPasswordBycriptjs implements HashPassword {
  async hash(password: string) {
    return await hash(password, 6);
  }
  async compare(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword);
  }
}
