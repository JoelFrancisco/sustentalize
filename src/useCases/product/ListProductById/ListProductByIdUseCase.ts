import { ProductRepository } from '../../../repositories/ProductRepository/Implementation/PostgressProductRepository';
import { Product } from '@prisma/client';

export class ListProductByIdUseCase {
  constructor(
    private productRepository: ProductRepository
  ){}

  async execute(id: number) {
    try {
      const product = await this.productRepository.findById(id);
      return {
        error: false,
        message: "Product listed successfully", 
        product
      }
    } catch(err: any) {
      return {
        error: true, 
        message: "Error at listing product"
      }
    }
  }
}