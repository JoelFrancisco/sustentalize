import { PrismaClient } from '@prisma/client';

import { ProductRepository } from '../../../repositories/ProductRepository/Implementation/PostgressProductRepository';
import { ListProductByIdUseCase } from './ListProductByIdUseCase';
import { ListProductByIdController } from './ListProductByIdController';

const prisma = new PrismaClient();
const productRepository = new ProductRepository(prisma);
const listProductByIdUseCase = new ListProductByIdUseCase(productRepository);
const listProductByIdController = new ListProductByIdController(listProductByIdUseCase);

export { listProductByIdController };