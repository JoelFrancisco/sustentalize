import { UserRepository } from "../../../repositories/UserRepository/Implementation/PostgresUserRepository";

export class VerifyUserSessionUseCase {
  constructor(
    private userRepository: UserRepository,
  ){}
  
  async execute(id: string) {
    try { 
      if (!await this.userRepository.findBySessionId(id)) 
        return { error: true, message: "User not found" };
      
      return { error: false, message: "User verified" };
    } catch (err: any) {
      return { error: true, message: "Error verifying user" };
    }
  }
}