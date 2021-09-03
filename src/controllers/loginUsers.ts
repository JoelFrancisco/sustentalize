import { PrismaClient, User } from '@prisma/client';
import { randomUUID } from 'crypto';
import { Request, Response } from "express";

import { BcryptPassword } from '../utils/hash/Implementation/BcryptHashPassword';
import { UserRepository } from '../repositories/implementation/PostgresUserRepository';

export class LoginUser {
  public static async login(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const bcryptPassword = new BcryptPassword();
    const userRepository = new UserRepository(prisma, bcryptPassword);
    
    try { 
      const { email, password } = req.body;
      
      let user;

      try  { 
        user = await userRepository.findByEmail(email);
      } catch (err) {
        return res.json({ message: "Incorrect email or password" });
      }
      
      if (await bcryptPassword.checkHash(password, user!.password)) {
        return res.json({ auth: false });
      } 

      const id = randomUUID();
      res.cookie('session_id', id, { httpOnly: true, maxAge: 1200000 });
      return res.json({ auth: true });
    } catch (err) {
      return res.json({ message: "Error login user" });
    } finally {
      await prisma.$disconnect();
    }
  }
}