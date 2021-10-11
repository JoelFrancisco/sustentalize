import { PrismaClient, User } from "@prisma/client";

import { IUserRepository } from "../IUserRepository";
import { IHashPassword } from "../../utils/hash/IHashPassword";

export class UserRepository implements IUserRepository {
  private client;

  constructor(client: PrismaClient) {
    this.client = client;
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
        return { 
          error: true,
          message: 'Username and email already used.'
        } 

      if (usernameAlreadyUsed) 
        return {
          error: true,
          message: 'Username already used.'
        };
      
      if (emailAlreadyUsed) 
        return {
          error: true,
          message: 'Email already used.'
        };
      
      await this.client.user.create({
        data: { ...newUser }
      })
      
      return { 
        error: false,
        message: 'User created successfully.'
      }
    } catch (err: any) {
      return { 
        error: true,
        message: err.message
      }
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