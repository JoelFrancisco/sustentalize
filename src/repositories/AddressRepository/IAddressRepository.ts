import { Address } from '@prisma/client';

export interface IAddressRepository {
  findById(id: number): Promise<Address | null>
  listAll(): Promise<Address[] | null>;
  store(address: Address): Promise<Address | null>;
}