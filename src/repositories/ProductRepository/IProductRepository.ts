import { Product } from  '../../entities/Product';
import { IProductStoreError } from './IProductStoreError';  

export interface IProductRepository {
  findById(id: number): Promise<Product | null>;
  listAll(): Promise<Product[] | null>;
  updateProduct(product: Product | null): void;
  store(product: Product): Promise<IProductStoreError>
}