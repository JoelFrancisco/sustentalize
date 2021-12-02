import { PrismaClient } from '@prisma/client';

import { BcryptPassword } from '../../../utils/hash/Implementation/BcryptHashPassword';
import { UuidGenerator } from '../../../utils/UuidGenerator/Implementation/UuidGenerator';
import { UserRepository } from '../../../repositories/UserRepository/Implementation/PostgresUserRepository';
import { HandleTokenGeneration } from '../../../utils/HandleTokenGeneration';
import { LoginUserUseCase } from './LoginUserUseCase';
import { LoginUserController } from './LoginUserController';

const prisma = new PrismaClient();
const bcryptPassword = new BcryptPassword();
const handleTokenGeneration = new HandleTokenGeneration();
const userRepository = new UserRepository(prisma);
const loginUserUseCase = new LoginUserUseCase(userRepository, bcryptPassword, handleTokenGeneration);
const loginUserController = new LoginUserController(loginUserUseCase);

export { loginUserController };