import { Request, Response } from 'express';
import { Address } from '@prisma/client';

import { DeleteAddressUseCase } from './DeleteAddressUseCase';

export class DeleteAddressController {
  constructor(
    private deleteAddressUseCase: DeleteAddressUseCase
  ){}

  async handle(req: any, res: Response) {
    const { id } = req.params;
    
    try { 
      const { error, message } = await this.deleteAddressUseCase.execute(Number(id));
      
      console.log(error);

      return error
        ? res.status(400).json({ message })
        : res.status(204).json({ message });
    } catch (err: any) {
      return res.status(400).json({ 
        message: err.message || "Unexpected error"
      });
    }
  }
}

