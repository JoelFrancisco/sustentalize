import { Request, Response } from "express";

import { LoginUserUseCase } from './LoginUserUseCase';
import { ILoginUserDTO } from "./ILoginUserDTO";

export class LoginUserController {
  constructor(
    private loginUserUseCase: LoginUserUseCase
  ){}
  
  async handle(req: Request, res: Response) {
    try { 
      const response = await this.loginUserUseCase.execute(req.body as ILoginUserDTO);
      
      if (!response.error) 
        return res.status(400).json({ 
          message: response.message
        });
        
      res.cookie('session_id', response.id, { httpOnly: true, maxAge: 1200000 });
      
      return res.status(200).json({ 
        message: response.message
      });
    } catch (err: any) {
      return res.status(400).json({ 
        message: err.message 
      });
    }
  }
}