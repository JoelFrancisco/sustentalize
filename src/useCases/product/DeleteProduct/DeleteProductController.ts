import { Request, Response } from 'express';

import { DeleteProductUseCase } from './DeleteProductUseCase';
import { PrismaClient } from '@prisma/client';

export class DeleteProductController {
  constructor(
    private deleteProductUseCase: DeleteProductUseCase
  ){};

  async handle(req: any, res: Response) {
    const prisma = new PrismaClient();

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.id
        }
      })

      if (user?.role !== 'ADMIN') {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    } catch (err: any) {
      console.error(err);
    }
    

    const { id } = req.params;

    try { 
      const { error, message } = await this.deleteProductUseCase.execute(Number(id));

      return error 
        ? res.status(400).json({ message }) 
        : res.status(204).json({ message });
    } catch (err: any) {
      return res.status(400).json({ 
        message: err.message || 'Unexpected error'
      })
    }
  }
}