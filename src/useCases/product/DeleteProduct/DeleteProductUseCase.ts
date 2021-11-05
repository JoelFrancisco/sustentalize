import { ProductRepository } from '../../../repositories/ProductRepository/Implementation/PostgressProductRepository';
import { Product } from '../../../entities/Product';

export class DeleteProductUseCase {
  constructor(
    private productRepository: ProductRepository,
  ){}

  async execute(id: number) {
    try {
      return await this.productRepository.delete(id);
    } catch(err: any) {
      return { 
        error: true, 
        message: "Error deleting product"
      }
    }
  }
}