import { Request, Response } from 'express';

import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase
  ) {}
  
  async handle(req: Request, res: Response) {
    const user = { ...req.body };
    
    try { 
      const { error, message } = await this.createUserUseCase.execute(user);
      
      if (error) 
        return res.status(400).json({ message });
        
      return res.status(201).json({ message })
    } catch (err: any) {
      return res.status(400).json({ 
        message: err.message || 'Unexpected error'
      });
    }
  }
}