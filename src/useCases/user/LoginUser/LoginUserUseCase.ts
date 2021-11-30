import { IUserRepository } from '../../../repositories/UserRepository/IUserRepository';
import { ILoginUserDTO } from './ILoginUserDTO';
import { HandleTokenGeneration } from '../../../utils/HandleTokenGeneration';
import { IHashPassword } from '../../../utils/hash/IHashPassword';

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private handlePasswordHash: IHashPassword,
    private handleTokenGeneration: HandleTokenGeneration
  ){} 
  
  async execute({ email, password }: ILoginUserDTO) {
    try { 
      const user = await this.userRepository.findByEmail(email);
      
      if (!user || !await this.handlePasswordHash.checkHash(password, user.password)) 
        return { error: true, message: 'Incorrect email or password' };
      
      const token = this.handleTokenGeneration.generateToken(user.id.toString(), email);
      
      return { 
        error: false, 
        message: 'Login worked successfully', 
        token
      };
    } catch (err) {
      return { error: true, message: 'Login error' };
    }
  }
}