import { PrismaClient } from '@prisma/client';

import { UserRepository } from '../../../repositories/UserRepository/Implementation/PostgresUserRepository';
import { VerifyUserSessionUseCase } from './VerifyUserSessionUseCase';
import { VerifyUserSessionController } from './VerifyUserSessionController';

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);
const verifyUserSessionUseCase = new VerifyUserSessionUseCase(userRepository);
const verifyUserSessionController = new VerifyUserSessionController(verifyUserSessionUseCase);

export { verifyUserSessionController };