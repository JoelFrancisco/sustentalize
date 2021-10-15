/*import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ProductRepository } from '../../repositories/ProductRepository/Implementation/PostgressProductRepository';
import { UserRepository } from '../../repositories/UserRepository/Implementation/PostgresUserRepository';
import { BcryptPassword } from '../hash/Implementation/BcryptHashPassword';

export class Cart {
  public static async cart(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const productRepository = new ProductRepository(prisma);
    const bcryptPassword = new BcryptPassword();
    const userRepository = new UserRepository(prisma );

    try {
      const productId = req.body.id;
      const userSessionId = req.cookies['session_id'];

      const product = await productRepository.findById(productId);
      const currentUser = await userRepository.findBySessionId(userSessionId);

      const userWithProducts = await prisma.user.findUnique({ 
        where: { 
          id: currentUser?.id 
        },
        include: {
          cart: true
        }
      });

      await prisma.user.update({
        where: {
          id: currentUser?.id
        },
        data: {
          cart: {
            update: {
              where: {
                id: productId
              },
              data: {
                
              }
            }
          }
        }
      });

    } catch(err: any) {
      return res
        .status(404)
        .json({ message: "Error adding product"})
    } finally {
      await prisma.$disconnect();
    }

    return res
      .status(201)
      .json({ message: "Product added successfully"})
  }
}*/