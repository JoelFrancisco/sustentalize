import { Request, Response } from 'express';

export type IController = { 
  handle(req: Request, res: Response): Promise<Response<any, Record<string, any>>> 
};