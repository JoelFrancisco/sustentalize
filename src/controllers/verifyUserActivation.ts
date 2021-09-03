import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";

import { BcryptPassword } from "../utils/hash/Implementation/BcryptHashPassword";
import { UserRepository } from "../repositories/implementation/PostgresUserRepository";

export class VerifyUserActivation {
  public static async verification(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const bcryptPassword = new BcryptPassword();
    const userRepository = new UserRepository(prisma, bcryptPassword);
    
    try { 
      const user = await userRepository.findByActivationId(req.body.activation_id);
      
      if (req.body.activation_id === user?.activation_id) {
        user!.activated = true;
        await userRepository.updateUser(user);
      }

    } catch (err) {
      return res.json({ message: "Error activating User"});
    } finally {
      await prisma.$disconnect();
    }
  }
}