import { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';

import { UserRepository } from '../../repositories/implementation/PostgresUserRepository';
import { BcryptPassword } from '../../utils/hash/Implementation/BcryptHashPassword';

export const getUserDataFromSessionId = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const bcryptPassword = new BcryptPassword();
  const userRepository = new UserRepository(prisma, bcryptPassword);
  
  try { 
    const user = await userRepository.findBySessionId(req.cookies.session_id);
    return user;
  } catch (err) {

  }
}