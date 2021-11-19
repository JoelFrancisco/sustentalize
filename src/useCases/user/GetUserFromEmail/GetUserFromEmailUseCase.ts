import { IUserRepository } from '../../../repositories/UserRepository/IUserRepository';

export class GetUserFromEmailUseCase {
  constructor(
    private userRepository: IUserRepository
  ){}
  
  async execute(email: string) {
    try { 
      const user = await this.userRepository.findByEmail(email);
      
      return { 
        error: false,
        message: 'Got user successfully',
        user
      }
    } catch (err) {
      return { error: true, message: 'Error in finding user' };
    }
  }
}