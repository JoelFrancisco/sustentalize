import { ProductRepository } from "../../../repositories/ProductRepository/Implementation/PostgressProductRepository";
import { Product } from "../../../entities/Product";

export class CreateProductUseCase {
  constructor(
    private productRepository: ProductRepository
  ){}
  
  async execute(product: Product) {
    
  }
}