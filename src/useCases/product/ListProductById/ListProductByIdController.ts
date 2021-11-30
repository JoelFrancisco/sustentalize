import { Request, Response } from 'express';

import { ListProductByIdUseCase } from './ListProductByIdUseCase';
import { Product } from '@prisma/client';

export class ListProductByIdController {
  constructor (
    private listProductByIdUseCase: ListProductByIdUseCase,
  ){}

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try { 
      const { error, message, ...rest } = await this.listProductByIdUseCase.execute(Number(id));

      return error 
        ? res.status(400).json({ message }) 
        : res.status(200).json({ message, product: rest.product });
    } catch(err: any) {
      return res.status(400).json({ 
        message: err.message || 'Unexpected error'
      })
    }
  }
}