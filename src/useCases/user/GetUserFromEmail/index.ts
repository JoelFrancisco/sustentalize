import { PrismaClient } from '@prisma/client';

import { UserRepository } from '../../../repositories/UserRepository/Implementation/PostgresUserRepository';
import { GetUserFromEmailUseCase } from './GetUserFromEmailUseCase';
import { GetUserFromEmailController } from './GetUserFromEmailController';

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);
const getUserFromEmailUseCase = new GetUserFromEmailUseCase(userRepository);
const getUserFromEmailController = new GetUserFromEmailController(getUserFromEmailUseCase);

export { getUserFromEmailController };