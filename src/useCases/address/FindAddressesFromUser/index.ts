import { PrismaClient } from '@prisma/client';

import { AddressRepository } from '../../../repositories/AddressRepository/Implementation/AddressRepository';
import { FindAddressesFromUserUseCase } from './FindAddressesFromUserUseCase';
import { FindAddressesFromUserController } from './FindAddressesFromUserController'

const prisma = new PrismaClient(); 
const addressRepository = new AddressRepository(prisma);
const findAddressesFromUserUseCase = new FindAddressesFromUserUseCase(addressRepository);
const findAddressesFromUserController = new FindAddressesFromUserController(findAddressesFromUserUseCase);

export { findAddressesFromUserController };