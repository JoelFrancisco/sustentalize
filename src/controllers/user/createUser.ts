import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
// import { randomUUID } from 'crypto'; 
import { config } from 'dotenv';
config();

import { UserRepository } from "../../repositories/implementation/PostgresUserRepository";
import { BcryptPassword } from "../../utils/hash/Implementation/BcryptHashPassword";
// import { MailOptions } from '../entities/MailOptions';
// import { SenderCredentials } from '../entities/SenderCredentials';
// import { Nodemailer } from '../providers/Mail/Implementation/Nodemailer';

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

  // private static async handleEmail(user: User): Promise<boolean> {
  //   const senderCredentials = new SenderCredentials(
  //     process.env.SUSTENTALIZE_EMAIL_SERVICE!,
  //     process.env.SUSTENTALIZE_EMAIL_USERNAME!,
  //     process.env.SUSTENTALIZE_EMAIL_PASSWORD!,
  //   );
    
  //   const mailOptions = new MailOptions(
  //     process.env.SUSTENTALIZE_EMAIL_USERNAME!,
  //     user.email,
  //     `${user.username} ative sua conta no sustentalize`,
  //     `<a href="">Clique no link para ativar sua conta</a>
  //     <p>${user.activation_id}</p>
  //     <p>Caso não tenha solicitado uma conta no sustentalize ignore esse email</p>
  //     `,
  //   );
    
  //   const mailProvider = new Nodemailer();
  //   const mailStatus = await mailProvider.sendEmail(senderCredentials, mailOptions);
  //   return mailStatus;
  // }
}