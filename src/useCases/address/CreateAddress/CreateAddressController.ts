import { Request, Response } from 'express';
import { Address } from '@prisma/client';

import { CreateAddressUseCase } from './CreateAddressUseCase';

export class CreateAddressController {
  constructor(
    private createAddressUseCase: CreateAddressUseCase
  ){}

  async handle(req: any, res: Response) {
    const address: Address = { ...req.body };

    address.userId = Number(req.id);
    
    console.log(address);
    
    try { 
      const { error, message } = await this.createAddressUseCase.execute(address);

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

