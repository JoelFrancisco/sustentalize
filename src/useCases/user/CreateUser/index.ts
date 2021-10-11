import { PrismaClient } from '@prisma/client';

import { BcryptPassword } from '../../../utils/hash/Implementation/BcryptHashPassword';
import { UserRepository } from '../../../repositories/Implementation/PostgresUserRepository';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserController } from './CreateUserController';

export const prisma = new PrismaClient();
const passwordHasher = new BcryptPassword();
const userRepository = new UserRepository(prisma);
const createUserUseCase = new CreateUserUseCase(userRepository, passwordHasher);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
