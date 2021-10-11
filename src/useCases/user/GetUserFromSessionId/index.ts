import { PrismaClient } from '@prisma/client';

import { BcryptPassword } from '../../../utils/hash/Implementation/BcryptHashPassword';
import { UserRepository } from '../../../repositories/Implementation/PostgresUserRepository';
import { GetUserFromSessionIdController } from "./GetUserFromSessionIdController";
import { GetUserFromSessionIdUseCase } from "./GetUserFromSessionIdUseCase";

const prisma = new PrismaClient();
const bcryptPassword = new BcryptPassword();
const userRepository = new UserRepository(prisma);
const getUserFromSessionIdUseCase = new GetUserFromSessionIdUseCase(userRepository);
const getUserFromSessionIdController = new GetUserFromSessionIdController(getUserFromSessionIdUseCase);

export { getUserFromSessionIdController };

