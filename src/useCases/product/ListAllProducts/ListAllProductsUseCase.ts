import { ProductRepository } from "src/repositories/ProductRepository/Implementation/PostgressProductRepository";
import { Product } from "@prisma/client";

export class ListAllProductsUseCase {
  constructor(
    private productRepository: ProductRepository
  ){}
  
  async execute() {
    try { 
      return { 
        error: false,
        message: 'Products listed successfully',
        products: await this.productRepository.listAll() 
      };
    } catch (err) {
      return { 
        error: true, 
        message: "Error listing users"
      }
    }
  }
}