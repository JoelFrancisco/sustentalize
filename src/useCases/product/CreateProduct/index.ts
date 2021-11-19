import { PrismaClient } from '@prisma/client';

import { ProductRepository } from 'src/repositories/ProductRepository/Implementation/PostgressProductRepository';
import { CreateProductUseCase } from './CreateProductUseCase';
import { CreateProductController } from './CreateProductController';

export const prisma = new PrismaClient();
const productRepository = new ProductRepository(prisma);
const createProductUseCase = new CreateProductUseCase(productRepository);
const createProductController = new CreateProductController(createProductUseCase);

export { createProductController };