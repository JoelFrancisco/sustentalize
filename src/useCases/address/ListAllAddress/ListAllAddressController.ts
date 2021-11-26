import { Request, Response } from 'express';

import { ListAllAddressUseCase } from './ListAllAddressUseCase';

export class ListAllAddressController {
  constructor(
    private listAllAddressUseCase: ListAllAddressUseCase
  ){}

  async handle(req: Request, res: Response) {
    try { 
      const { error, message, ...rest } = await this.listAllAddressUseCase.execute();

      return error
        ? res.status(400).json({ message })
        : res.status(200).json({ 
            message, 
            addresses: rest.addresses 
          });
    } catch (err: any) {
      return res.status(400).json({ 
        message: err.message || "Unexpected error"
      });
    }
  }
}