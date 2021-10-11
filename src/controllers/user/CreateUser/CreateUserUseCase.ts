import { IUserRepository } from "src/repositories/IUserRepository";
import { User } from "@prisma/client";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository
  ) {}
  
  async execute(user: User) {
    try { 
      await this.userRepository.store(user);
    } catch (err) {
      
    }
  }
}