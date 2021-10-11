import { v4 as uuidv4 } from 'uuid';

export class UuidGenerator {
  generateUuid() {
    const id = uuidv4();
    return id;
  }
}