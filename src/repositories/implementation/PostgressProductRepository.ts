import { PrismaClient, Product } from "@prisma/client";

import { IProductRepository } from "../IProductRepository";

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

      return product;
    } catch (err: any) {
      throw new Error(err.message);
    } finally {
      await this.client.$disconnect();
    }
  }

  public async listAll() {
    try {
      const products = await this.client.product.findMany();
      return products;
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
    console.log("Product from store in repository", product);

    let productDoesntExistYet;

    try {
      productDoesntExistYet = await this.client.product.findFirst({
        where: {
          name: product.name
        }
      });

      console.log("AAAAAAAAAAAAAAAAAAAAA", productDoesntExistYet);
    } catch(err: any) {
      throw new Error(err.message);
    } finally {
      await this.client.$disconnect();
    }
    
    console.log("Product doesn't exist yet", productDoesntExistYet);

    if (productDoesntExistYet) 
      return false;

    try {
      await this.client.product.create({
        data: { ...product }
      });
    } catch(err: any) {
      throw new Error(err.message);
    } finally {
      await this.client.$disconnect();
    }

    return product;
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
