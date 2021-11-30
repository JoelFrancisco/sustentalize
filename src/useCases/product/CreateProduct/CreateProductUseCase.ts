import { ProductRepository } from "../../../repositories/ProductRepository/Implementation/PostgressProductRepository";
import { Product } from "@prisma/client";
import { Express } from 'express';

export class CreateProductUseCase {
  constructor(
    private productRepository: ProductRepository
  ){}
  
  async execute(product: Product) {
    try { 
      return await this.productRepository.store(product);
    } catch (err) {
      return { 
        error: true, 
        message: "Error creating product"
      }
    }
  }
}