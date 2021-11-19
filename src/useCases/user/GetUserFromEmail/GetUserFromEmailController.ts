import { Request, Response } from "express";
import { GetUserFromEmailUseCase } from "./GetUserFromEmailUseCase";

export class GetUserFromEmailController {
  constructor(
    private getUserFromEmailUseCase: GetUserFromEmailUseCase
  ){}
  
  async handle(req: Request, res: Response) {
    try {
      const { 
        error, 
        message, 
        ...rest 
      } = await this.getUserFromEmailUseCase.execute(req.params.email);
      
      return error ? 
        res.status(404).json({ message }) : 
        res.status(200).json({ user: rest.user, message });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }
}