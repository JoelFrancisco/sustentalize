import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hash } from 'bcryptjs';

interface UserAtributes {
  id: number;
  username: string;
  email: string;
  password: string;
}

class CreateUser {
  public static async create(req: Request, res: Response) {
    const prisma = new PrismaClient();

    try { 
      const user: UserAtributes = { ...req.body };
      
      const hashedPassword = await hash(user.password, 10);
      
      user.password = hashedPassword;

      const userExists = await prisma.user.findUnique({ 
        where: { 
          username: user.username
        } 
      });

      if (userExists) {
        return res.json({ message: 'User Already exists' });
      }

      await prisma.user.create({ 
        data: { 
          ...user
        }
      });

      return res.status(200).json({ message: 'User created'});

    } catch (err) {
      return res.json({ message: "Error Creating User"});
    } finally {
      await prisma.$disconnect();
    }
  }
}

export { CreateUser }