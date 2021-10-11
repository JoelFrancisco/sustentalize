import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from "express";

import { BcryptPassword } from '../../utils/hash/Implementation/BcryptHashPassword';
import { UserRepository } from '../../repositories/Implementation/PostgresUserRepository';

export class LoginUser {
  public static async login(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const bcryptPassword = new BcryptPassword();
    const userRepository = new UserRepository(prisma);
    
    try { 
      const { email, password } = req.body;
      
      let user;

      try  { 
        user = await userRepository.findByEmail(email);
        console.log(user);
      } catch (err) {
        return res.json({ message: "Incorrect email or password" });
      }
      
      if (!await bcryptPassword.checkHash(password, user!.password)) {
        return res.json({ auth: false });
      } 

      const id = uuidv4();
      res.cookie('session_id', id, { httpOnly: true, maxAge: 1200000 });
      user!.session_id = id;
      await userRepository.updateUser(user);

      return res.json({ auth: true });
    } catch (err) {
      return res.json({ message: "Error login user" });
    } finally {
      await prisma.$disconnect();
    }
  }
}