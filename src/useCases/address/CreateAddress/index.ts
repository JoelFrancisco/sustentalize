import { PrismaClient } from '@prisma/client';

import { AddressRepository } from '../../../repositories/AddressRepository/Implementation/AddressRepository';
import { CreateAddressUseCase } from './CreateAddressUseCase';
import { CreateAddressController } from './CreateAddressController';

const prisma = new PrismaClient();
const addressRepository = new AddressRepository(prisma);
const createAddressUseCase = new CreateAddressUseCase(addressRepository);
const createAddressController = new CreateAddressController(createAddressUseCase);

export { createAddressController };