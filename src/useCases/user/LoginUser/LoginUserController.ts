import { Request, Response } from "express";

import { LoginUserUseCase } from './LoginUserUseCase';
import { ILoginUserDTO } from "./ILoginUserDTO";

export class LoginUserController {
  constructor(
    private loginUserUseCase: LoginUserUseCase
  ){}
  
  async handle(req: Request, res: Response) {
    try { 
      const { email, password } = req.body;

      const { error, message, ...rest } = await this.loginUserUseCase.execute({ email, password } as ILoginUserDTO);
      
      return error 
        ? res.status(400).json({ message })
        : res
            .cookie('session_id', rest.id, { 
              httpOnly: false, maxAge: 1200000 
            })
            .status(200)
            .json({ message })
    } catch (err: any) {
      return res.status(400).json({ 
        message: err.message 
      });
    }
  }
}

