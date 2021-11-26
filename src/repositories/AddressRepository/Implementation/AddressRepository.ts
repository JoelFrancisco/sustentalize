import { PrismaClient, Address } from '@prisma/client';

import { IAddressRepository } from '../IAddressRepository';

export class AddressRepository implements IAddressRepository {
  private client;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  public async findById(id: number) {
    try {
      const address = await this.client.address.findUnique({
        where: { 
          id
        }
      });

      return address;
    } catch (err: any) {
      return null;
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
      })

      return address;
    } catch (err) {
      return null;
    } finally {
      await this.client.$disconnect();
    }
  }
}