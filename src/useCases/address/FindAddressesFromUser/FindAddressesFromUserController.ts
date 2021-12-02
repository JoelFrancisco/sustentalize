import { Response } from 'express';
import { FindAddressesFromUserUseCase } from "./FindAddressesFromUserUseCase";

export class FindAddressesFromUserController {
  constructor(
    private findAddressesFromUserUseCase: FindAddressesFromUserUseCase
  ){}
  
  async handle(req: any, res: Response) {
    try { 
      const { error, message, ...rest } = await this.findAddressesFromUserUseCase.execute(Number(req.id));
      
      console.log(rest.addresses);

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