import { AddressRepository } from '../../../repositories/AddressRepository/Implementation/AddressRepository';

class FindAddressByIdUseCase {
  constructor(
    private addressRepository: AddressRepository
  ){}
  
  async execute(id: number) {
    try { 
      const address = await this.addressRepository.findById(id);

      if (!address) {
        return {
          error: true,
          message: "Address founded successfully",
        }
      }

      return {
        error: false,
        message: "Address founded successfully",
        address
      }
    } catch(err) {
      return {
        error: true, 
        message: "Error finding address"
      }
    }
  }
}