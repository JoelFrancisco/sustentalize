import { PrismaClient } from "@prisma/client";

import { ProductRepository } from '../../../repositories/ProductRepository/Implementation/PostgressProductRepository'
import { DeleteProductUseCase } from "./DeleteProductUseCase"; 
import { DeleteProductController } from "./DeleteProductController"; 

const prisma = new PrismaClient();
const productRepository = new ProductRepository(prisma);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);
const deleteProductController = new DeleteProductController(deleteProductUseCase)

export { deleteProductController };