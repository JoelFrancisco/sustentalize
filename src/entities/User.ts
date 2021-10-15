import { User as IUser } from '@prisma/client'; 

export class User implements IUser {
  constructor(
    public id: number,
    public email: string,
    public username: string,
    public password: string,
    public session_id: string,
  ){}
}