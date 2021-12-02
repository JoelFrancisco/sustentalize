import { config } from 'dotenv';
config();

import mercadopago from 'mercadopago';

import { PrismaClient } from '@prisma/client';

import { ProductRepository } from '../../../repositories/ProductRepository/Implementation/PostgressProductRepository';
import { getImageUrl } from '../../../utils/GetImageUrl';

import { CreatePreferenceUseCase } from './CreatePreferenceUseCase';
import { CreatePreferenceController } from "./CreatePreferenceController";

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_SECRET_TOKEN || ""
});

const prisma = new PrismaClient();
const productRepository = new ProductRepository(prisma);
const createPreferenceUseCase = new CreatePreferenceUseCase(mercadopago); 
const createPreferenceController = new CreatePreferenceController(createPreferenceUseCase, productRepository, getImageUrl);

export { createPreferenceController };