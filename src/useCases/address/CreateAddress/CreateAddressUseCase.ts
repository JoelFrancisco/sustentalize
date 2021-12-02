import { AddressRepository } from '../../../repositories/AddressRepository/Implementation/AddressRepository';
import { Address } from '@prisma/client';

export class CreateAddressUseCase {
  constructor(
    private addressRepository: AddressRepository
  ){}

  async execute(address: Address) {
    try { 
      return await this.addressRepository.store(address);
    } catch (err) {
      return {
        error: true,
        message: "Error creating address" 
      }
    }
  }
}