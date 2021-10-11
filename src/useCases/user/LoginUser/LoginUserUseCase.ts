import { IUserRepository } from '../../../repositories/IUserRepository';
import { ILoginUserDTO } from './ILoginUserDTO';
import { IUuidGenerator } from '../../../utils/UuidGenerator/IUuidGenerator';
import { IHashPassword } from 'src/utils/hash/IHashPassword';

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private UuidGenerator: IUuidGenerator,
    private handlePasswordHash: IHashPassword
  ){} 
  
  async execute({ email, password }: ILoginUserDTO) {
    try { 
      const user = await this.userRepository.findByEmail(email);
      
      if (!user || !await this.handlePasswordHash.checkHash(password, user.password)) 
        return { error: true, message: 'Incorrect email or password' };
      
      const id = this.UuidGenerator.generateUuid();
      
      user.session_id = id;

      await this.userRepository.updateUser(user);
      
      return { 
        error: false, 
        message: 'Login worked successfully', 
        id 
      };
    } catch (err) {
      return { error: true, message: 'Login error' };
    }
  }
}