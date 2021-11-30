import { Request, Response } from 'express';
import { IController } from '../../../entities/IController';

import { CreateProductUseCase } from './CreateProductUseCase';

export class CreateProductController implements IController {
  constructor(
    private createProductUseCase: CreateProductUseCase
  ){}
  
  async handle(req: Request, res: Response) {
    const product = { 
      ...req.body, 
      price: Number(req.body.price),
      quantity: Number(req.body.quantity)
    };

    const { file } = req;

    const fileName = file?.originalname;
    product.image_url = fileName || "";
    
    try { 
      const { error, message } = await this.createProductUseCase.execute(product);
      
      return error 
        ? res.status(400).json({ message }) 
        : res.status(201).json({ message });
    } catch (err: any) {
      return res.status(400).json({ 
        message: err.message || "Unexpected error"
      });
    }
  }
}