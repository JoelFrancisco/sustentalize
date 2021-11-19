import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../../repositories/UserRepository/Implementation/PostgresUserRepository';
import { PrismaClient } from '@prisma/client';

const handleAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  
  const prisma = new PrismaClient();
  const userRepository = new UserRepository(prisma);
  
  try {
    const response = await userRepository.findByEmail(email);
    return response ? next() : res.status(403).json({ error: true, message: 'not authorized'});
  } catch (err: any) {
    return res.status(403).json({ error: true, message: err.message });
  }
}

export { handleAdmin };