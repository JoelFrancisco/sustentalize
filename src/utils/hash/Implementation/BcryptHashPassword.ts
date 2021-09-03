import { hash, compare } from 'bcryptjs';

import { IHashPassword } from '../IHashPassword';

export class BcryptPassword implements IHashPassword {
  async hash(value: string) {
    const hashedValue = await hash(value, 10);
    return hashedValue;
  }
  
  async checkHash(receivedValue: string, storedValue: string) {
    const answer = await compare(receivedValue, storedValue) ? true : false;
    return answer;
  }
}