import { Request, Response } from 'express';
import { IController } from 'src/entities/IController';

import { ListAllProductsUseCase } from './ListAllProductsUseCase';

export class ListAllProductsController implements IController {
  constructor(
    private listAllProductsUseCase: ListAllProductsUseCase
  ){}
  
  async handle(req: Request, res: Response) {
    try { 
      const { error, message, ...rest } = await this.listAllProductsUseCase.execute();
      
      return error 
        ? res.status(400).json({ message }) 
        : res.status(201).json({ 
          message, 
          products: rest.products 
        });
    } catch (err: any) {
      return res.status(400).json({ 
        message: err.message || "Unexpected error"
      });
    }
  }
}