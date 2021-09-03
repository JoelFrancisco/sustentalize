import { User } from '@prisma/client';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findByActivationId(activation_id: string): Promise<User | null>;
  findBySessionId(session_id: string): Promise<User | null>;
  updateUser(user: User | null): void;
  store(user: User): Promise<string>;
}