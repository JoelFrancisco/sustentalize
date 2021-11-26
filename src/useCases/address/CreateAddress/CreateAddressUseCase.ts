import { AddressRepository } from '../../../repositories/AddressRepository/Implementation/AddressRepository';
import { Address } from '@prisma/client';

export class CreateAddressUseCase {
  constructor(
    private addressRepository: AddressRepository
  ){}

  async execute(address: Address) {
    try { 
      const _address = await this.addressRepository.store(address);

      if (!_address) 
        return {
          error: true,
          message: "Error creating address"
        }

      return { 
        error: false, 
        message: "Address created successfully" 
      };
    } catch (err) {
      return {
        error: true,
        message: "Error creating address" 
      }
    }
  }
}