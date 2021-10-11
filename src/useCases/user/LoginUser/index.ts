import { PrismaClient } from '@prisma/client';

import { BcryptPassword } from '../../../utils/hash/Implementation/BcryptHashPassword';
import { UuidGenerator } from 'src/utils/UuidGenerator/Implementation/UuidGenerator';
import { UserRepository } from '../../../repositories/Implementation/PostgresUserRepository';
import { LoginUserUseCase } from './LoginUserUseCase';
import { LoginUserController } from './LoginUserController';

const prisma = new PrismaClient();
const uuidGenerator = new UuidGenerator();
const bcryptPassword = new BcryptPassword();
const userRepository = new UserRepository(prisma);
const loginUserUseCase = new LoginUserUseCase(userRepository, uuidGenerator, bcryptPassword);
const loginUserController = new LoginUserController(loginUserUseCase);

export { loginUserController };