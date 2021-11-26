import { AddressRepository } from '../../../repositories/AddressRepository/Implementation/AddressRepository';

export class ListAllAddressUseCase {
  constructor(
    private addressRepository: AddressRepository
  ){}

  async execute() {
    try {
      const addresses = await this.addressRepository.listAll();

      if (!addresses) 
        return {
          error: true,
          message: "Error listing address"
        }

      return { 
        error: false, 
        message: "Address listed successfully",
        addresses
      };
    } catch (err) {
      return { 
        error: true, 
        message: "Error listing addresses"
      }
    }
  }
}