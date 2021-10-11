import { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import { UserRepository } from '../../repositories/Implementation/PostgresUserRepository';
import { BcryptPassword } from '../../utils/hash/Implementation/BcryptHashPassword';

export class VerifySessionId {
  public static async verify(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const bcryptPassword = new BcryptPassword(); 
    const userRepository = new UserRepository(prisma);
    
    try { 
      try {
        if(await userRepository.findBySessionId(req.cookies.session_id))
          return res.json({ auth: true });
      } catch (err) {
        return res.json({ auth: false });
      }
    } catch (err) {
      return res.json({ message: "Error verifying User"});
    } finally {
      await prisma.$disconnect();
    }
  }
}
