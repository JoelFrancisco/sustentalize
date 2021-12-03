import { PrismaClient, Address } from '@prisma/client';

import { IAddressRepository } from '../IAddressRepository';

export class AddressRepository implements IAddressRepository {
  private client;

  constructor(client: PrismaClient) {
    this.client = client;
  }
  
  public async findFromUser(id: number) {
    console.log('teste');

    try {
      const addresses = await this.client.address.findMany({ 
        where: { 
          userId: id
        }
      });
      
      return { 
        error: false, 
        message: "Addresses found successfully",
        addresses
      };
    } catch (err: any) {
      return { 
        error: true, 
        message: err.message
      };
    } finally {
      await this.client.$disconnect();
    }
  }

  public async findById(id: number) {
    try {
      const address = await this.client.address.findUnique({
        where: { 
          id
        }
      });

      return address as Address;
    } catch (err: any) {
      throw new Error(err.message);
    } finally {
      await this.client.$disconnect();
    }
  }

  public async listAll() {
    try {
      const addresses = await this.client.address.findMany();
      return addresses;
    } catch (err: any) {
      return null;
    } finally {
      await this.client.$disconnect();
    }
  }

  public async store(address: Address) {
    try { 
      await this.client.address.create({
        data: { ...address }
      });

      return { 
        error: false,
        message: 'Address created successfully'
      };
    } catch (err: any) {
      return { 
        error: true, 
        message: err.message
      };
    } finally {
      await this.client.$disconnect();
    }
  }
  
  public async delete(id: number) {
    try { 
      await this.client.address.delete({
        where: { 
          id 
        }
      });
      
      return { 
        error: false,
        message: 'Address deleted successfully'
      };
    } catch (err: any) {
      return { 
        error: true, 
        message: err.message
      };
    } finally {
      await this.client.$disconnect();
    }
  }
}