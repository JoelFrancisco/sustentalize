import { ProductRepository } from '../../../repositories/ProductRepository/Implementation/PostgressProductRepository';
import { Product } from '../../../entities/Product';

export class ListProductByIdUseCase {
  constructor(
    private productRepository: ProductRepository
  ){}

  async execute(id: number) {
    try {
      return await this.productRepository.findById(id);
    } catch(err: any) {
      return {
        error: true, 
        message: "Error at listing product"
      }
    }
  }
}