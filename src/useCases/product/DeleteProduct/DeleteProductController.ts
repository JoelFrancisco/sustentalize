import e, { Request, Response } from 'express';

import { DeleteProductUseCase } from './DeleteProductUseCase';

export class DeleteProductController {
  constructor(
    private deleteProductUseCase: DeleteProductUseCase
  ){};

  async handle(req: Request, res: Response) {
    const product = { ...req.body };

    try { 
      const { error, message } = await this.deleteProductUseCase.execute(product.id);

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