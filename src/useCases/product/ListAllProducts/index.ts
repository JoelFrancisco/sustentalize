import { PrismaClient } from "@prisma/client";

import { ProductRepository } from '../../../repositories/ProductRepository/Implementation/PostgressProductRepository';
import { ListAllProductsUseCase } from './ListAllProductsUseCase';
import { ListAllProductsController } from "./ListAllProductsController";

export const prisma = new PrismaClient();
const productRepository = new ProductRepository(prisma);
const listAllProductsUseCase = new ListAllProductsUseCase(productRepository);
const listAllProductsController = new ListAllProductsController(listAllProductsUseCase);

export { listAllProductsController };