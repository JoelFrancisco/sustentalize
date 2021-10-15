import { Request, Response } from 'express';
import { VerifyUserSessionUseCase } from "./VerifyUserSessionUseCase";

export class VerifyUserSessionController {
  constructor(
    private verifyUserSessionUseCase: VerifyUserSessionUseCase
  ){}
  
  async handle(req: Request, res: Response) {
    const id = req.cookies.session_id;
    const { error, message } = await this.verifyUserSessionUseCase.execute(id);

    if (error) 
      return res.status(400).json({ auth: false, message });
    
    return res.status(200).json({ auth: true, message });
  }
}