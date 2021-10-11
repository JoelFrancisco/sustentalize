import { Request, Response } from 'express';

import { GetUserFromSessionIdUseCase } from "./GetUserFromSessionIdUseCase";

export class GetUserFromSessionIdController {
  constructor(
    private getUserFromSessionIdUseCase: GetUserFromSessionIdUseCase
  ){}
  
  async handle(req: Request, res: Response) {
    const id: string = req.cookies.session_id; 
    
    try { 
      await this.getUserFromSessionIdUseCase.execute(id);
    } catch (err: any) {
      return res.status(400).json({ 
        message: err.message || 'Unexpected error'
      });
    }
  }
}