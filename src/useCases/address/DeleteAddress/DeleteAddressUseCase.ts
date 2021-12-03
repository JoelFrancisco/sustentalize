
import { AddressRepository } from '../../../repositories/AddressRepository/Implementation/AddressRepository';

export class DeleteAddressUseCase {
  constructor(
    private addressRepository: AddressRepository
  ){}

  async execute(id: number) {
    try { 
      return await this.addressRepository.delete(id);
    } catch (err) {
      return {
        error: true,
        message: "Error deleting address" 
      }
    }
  }
}