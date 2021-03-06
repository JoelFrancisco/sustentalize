import { PrismaClient, User } from "@prisma/client";

import { IUserRepository } from "../IUserRepository";
import { IHashPassword } from "../../utils/hash/IHashPassword";

export class UserRepository implements IUserRepository {
  private client;
  private hash;

  constructor(client: PrismaClient, hash: IHashPassword) {
    this.client = client;
    this.hash = hash;
  }

  public async findByEmail(email: string) {
    try {
      const user = await this.client.user.findUnique({ 
        where: { 
          email
        }
      });
      
      return user;
    } catch (err: any) {
      throw new Error(err.message);
    } finally {
      await this.client.$disconnect();
    }
  }

  public async findBySessionId(session_id: string) {
    try {
      const user = await this.client.user.findUnique({ 
        where: { 
          session_id
        }
      });
      
      return user;
    } catch (err: any) {
      throw new Error(err.message);
    } finally {
      await this.client.$disconnect();
    }
  }
  
  public async store(newUser: User) {
    try {
      const usernameAlreadyUsed = await this.client.user.findUnique({ 
        where: {
          username: newUser.username
        }
      });

      const emailAlreadyUsed = await this.client.user.findUnique({ 
        where: {
          email: newUser.email
        }
      });

      if (usernameAlreadyUsed && emailAlreadyUsed) 
        return 'Username and email already used.';

      if (usernameAlreadyUsed) 
        return 'Username already used.';
      
      if (emailAlreadyUsed) 
        return 'Email already used.';
      
      const hashedPassword = await this.hash.hash(newUser.password);
      newUser.password = hashedPassword;
      
      // const hashedActivationId = await this.hash.hash(newUser.activation_id);
      // newUser.activation_id = hashedActivationId;

      console.table(newUser)
      
      await this.client.user.create({
        data: { ...newUser }
      })
      
      return 'User created successfully'
    } catch (err: any) {
      throw new Error(err.message);
    } finally {
      await this.client.$disconnect();
    }
  }
  
  public async updateUser(user: User | null) {
    console.log(`USER: ${user}`);

    try {
      await this.client.user.update({ 
        where: { 
          email: user?.email
        },
        data: {
          ...user 
        }
      });
    } catch (err: any) {
      throw new Error(err.message);
    } finally {
      await this.client.$disconnect();
    }
  }
}