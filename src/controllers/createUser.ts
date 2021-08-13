import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { User } from "../entities/User";
import { UserRepository } from "../repositories/implementation/PostgresUserRepository";
import { BcryptPassword } from "../utils/hash/Implementation/BcryptHashPassword";

export class CreateUser {
  public static async create(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const bcryptPassword = new BcryptPassword(); 
    const userRepository = new UserRepository(prisma, bcryptPassword);

    try { 
      const user: User = { ...req.body };
      
      const message = await userRepository.store(user);
      
      if (message !== 'User created successfully') 
        return res.status(404).json({ message });

      return res.status(200).json({ message });
    } catch (err) {
      return res.json({ message: "Error Creating User"});
    } finally {
      await prisma.$disconnect();
    }
  }
}