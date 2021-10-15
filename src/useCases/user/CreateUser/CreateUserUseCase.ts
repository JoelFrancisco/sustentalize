import { User } from '../../../entities/User';
import { IUserRepository } from "../../../repositories/UserRepository/IUserRepository";
import { IHashPassword } from "src/utils/hash/IHashPassword";

export class CreateUserUseCase {
  constructor (
    private userRepository: IUserRepository, 
    private passwordHasher: IHashPassword
  ) {}
  
  async execute(user: User) {
    try { 
      const hashedPassword = await this.passwordHasher.hash(user.password);
      user.password = hashedPassword;

      const response = await this.userRepository.store(user);
      
      return response;
    } catch (err) {
      return { 
        error: true, 
        message: "Error creating user" 
      };
    }
  }
}