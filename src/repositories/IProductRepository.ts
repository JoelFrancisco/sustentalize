import { Product } from "@prisma/client";

export interface IProductRepository {
  findById(id: number): Promise<Product | null>;
  listAll(): Promise<Product[] | null>;
  updateProduct(product: Product | null): void;
  store(product: Product): Promise<Product | Boolean>
}