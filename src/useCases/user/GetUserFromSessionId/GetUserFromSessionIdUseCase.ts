import { IUserRepository } from "src/repositories/IUserRepository";

export class GetUserFromSessionIdUseCase {
  constructor(
    private userRepository: IUserRepository
  ){}

  async execute(id: string) {
    try { 
      const user = await this.userRepository.findBySessionId(id);
      return user;
    } catch (err) {
      return false;
    }
  }
}