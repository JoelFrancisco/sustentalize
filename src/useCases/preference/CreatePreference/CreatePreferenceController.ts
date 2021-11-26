import { Request, Response } from 'express';
import { CreatePreferenceUseCase } from './CreatePreferenceUseCase';

export class CreatePreferenceController {
  constructor(
    private createPreferenceUseCase: CreatePreferenceUseCase
  ){}

  async handle(req: Request, res: Response) {
    const preference = req.body.preference;
    const id = this.createPreferenceUseCase.execute(preference);
    return res.status(201).json({ message: 'Preference created successfully', id });
  }
}