import { Request, Response } from 'express';

import { CreateAddressUseCase } from './CreateAddressUseCase';

export class CreateAddressController {
  constructor(
    private createAddressUseCase: CreateAddressUseCase
  ){}

  async handle(req: Request, res: Response) {
    const address = { ...req.body };

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

