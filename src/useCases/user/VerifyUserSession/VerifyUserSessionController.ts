import { Request, Response } from 'express';
import { VerifyUserSessionUseCase } from "./VerifyUserSessionUseCase";

export class VerifyUserSessionController {
  constructor(
    private verifyUserSessionUseCase: VerifyUserSessionUseCase
  ){}
  
  async handle(req: Request, res: Response) {
    const { session_id }= req.cookies;
    const { error, message } = await this.verifyUserSessionUseCase.execute(session_id);

    return error
      ? res.status(400).json({ auth: false, message })
      : res.status(200).json({ auth: true, message }); 
  }
}