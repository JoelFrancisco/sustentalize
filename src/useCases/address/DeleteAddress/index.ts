import { PrismaClient } from '@prisma/client';

import { AddressRepository } from '../../../repositories/AddressRepository/Implementation/AddressRepository';
import { DeleteAddressUseCase } from './DeleteAddressUseCase';
import { DeleteAddressController } from './DeleteAddressController'

const prisma = new PrismaClient(); 
const addressRepository = new AddressRepository(prisma);
const deleteAddressUseCase = new DeleteAddressUseCase(addressRepository);
const deleteAddressController = new DeleteAddressController(deleteAddressUseCase);

export { deleteAddressController };