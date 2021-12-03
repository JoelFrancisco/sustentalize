import { Address } from '@prisma/client';
import { IAddressStoreError } from './IAddressStoreError';

export interface IAddressRepository {
  findById(id: number): Promise<Address | null>
  listAll(): Promise<Address[] | null>;
  store(address: Address): Promise<IAddressStoreError>;
  delete(id: number): Promise<IAddressStoreError>;
}