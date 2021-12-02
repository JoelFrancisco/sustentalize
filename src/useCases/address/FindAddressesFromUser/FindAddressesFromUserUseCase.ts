import { AddressRepository } from "../../../repositories/AddressRepository/Implementation/AddressRepository";

export class FindAddressesFromUserUseCase {
  constructor(
    private addressRepository: AddressRepository
  ){}
  
  async execute(id: number) {
    try { 
      return await this.addressRepository.findFromUser(id);
    } catch (err) {
      return {
        error: true, 
        message: "Error finding addresses from user"
      }
    }
  }
}