export interface IHashPassword {
  hash(value: string): Promise<string>;
  checkHash(receivedValue: string, storedValue: string): Promise<boolean>;
}