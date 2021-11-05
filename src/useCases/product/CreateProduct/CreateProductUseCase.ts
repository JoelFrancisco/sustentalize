import { ProductRepository } from "../../../repositories/ProductRepository/Implementation/PostgressProductRepository";
import { Product } from "../../../entities/Product";

export class CreateProductUseCase {
  constructor(
    private productRepository: ProductRepository
  ){}
  
  async execute(product: Product) {
    try { 
      return await this.productRepository.store(product);
    } catch(err: any) {
      return {
        error: true,
        message: "Error creating product"
      }
    }
  }
}