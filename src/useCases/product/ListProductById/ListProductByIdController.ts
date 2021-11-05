import { Request, Response } from 'express';

import { ListProductByIdUseCase } from './ListProductByIdUseCase';
import { Product } from '@prisma/client';

export class ListProductByIdController {
  constructor (
    private listProductByIdUseCase: ListProductByIdUseCase,
  ){}

  async handle(req: Request, res: Response) {
    const { id } = req.body;

    try { 
      const { error, message } = await this.listProductByIdUseCase.execute(id);

      return error 
        ? res.status(400).json({ message }) 
        : res.status(200).json({ message });
    } catch(err) {
      return res.status(400).json({ 
        message: err.message || 'Unexpected error'
      })
    }
  }
}