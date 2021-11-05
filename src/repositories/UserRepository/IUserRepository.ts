import { User } from '@prisma/client';
import { IUserStoreError } from './IUserStoreError';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findBySessionId(session_id: string): Promise<User | null>;
  updateUser(user: User | null): void;
  store(user: User): Promise<IUserStoreError>;
}