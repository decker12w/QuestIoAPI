// utils/implementations/HashPasswordMock.ts
import { HashPassword } from '@/utils/interfaces/HashPassword';

export class HashPasswordMock implements HashPassword {
  private storedPasswords: Map<string, string> = new Map();

  async hash(password: string): Promise<string> {
    const hashedPassword = `hashed-${password}`;
    this.storedPasswords.set(password, hashedPassword);
    return hashedPassword;
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return this.storedPasswords.get(password) === hashedPassword;
  }
}
