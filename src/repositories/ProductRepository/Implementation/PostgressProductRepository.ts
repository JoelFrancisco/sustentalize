import { PrismaClient } from "@prisma/client";

import { IProductRepository } from "../IProductRepository";
import { Product } from "@prisma/client";

export class ProductRepository implements IProductRepository {
  private client;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  public async findById(id: number) {
    try {
      const product = await this.client.product.findUnique({
        where: {
          id
        }
      });

      return product as Product;
    } catch (err: any) {
      throw new Error(err.message);
    } finally {
      await this.client.$disconnect();
    }
  }

  public async listAll() {
    try {
      const products = await this.client.product.findMany();
      return products as Product[];
    } catch(err: any) {
      throw new Error(err.message);
    } finally {
      await this.client.$disconnect();
    }
  }

  public async updateProduct(product: Product | null) {
    try {
      await this.client.product.update({
        where: {
          id: product?.id
        },
        data: {
          ...product
        }
      })
    } catch(err: any) {
      throw new Error(err.message);
    } finally {
      await this.client.$disconnect();
    }
  }

  public async store(product: Product) {
    try {
      const nameAlreadyUsed = await this.client.product.findUnique({
        where: {
          name: product.name
        }
      });
      
      if (nameAlreadyUsed)
        return {
          error: true, 
          message: 'Product name already used'
        }
        
      await this.client.product.create({
        data: { ...product }
      })
      
      return { 
        error: false, 
        message: 'Product created successfully'
      }
    } catch(err: any) {
      return { 
        error: true, 
        message: err.message
      }
    } finally {
      await this.client.$disconnect();
    }
  }

  public async delete(id: number) {
    try {
      await this.client.product.delete({
        where: {
          id
        }
      })
    } catch(err: any) {
      throw new Error(err.message);
    } finally {
      await this.client.$disconnect();
    }
  }
} 

