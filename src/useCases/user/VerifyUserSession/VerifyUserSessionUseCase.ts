import { UserRepository } from "src/repositories/Implementation/PostgresUserRepository";

export class VerifyUserSessionUseCase {
  constructor(
    private userRepository: UserRepository,
  ){}
  
  async execute(id: string) {
    try { 
      if (!await this.userRepository.findBySessionId(id)) 
        return { error: false, message: "", response: false };
      
      return true;
    } catch (err: any) {
      return { error: true, message: "Error verifying user" };
    }
  }
}