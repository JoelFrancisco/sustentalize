import multer from 'multer';

import { CreateProduct } from './useCases/product/createProduct';
import { Router, Request, Response } from "express";

import { ListProduct } from './useCases/product/listProductById';
import { UpdateProduct } from './useCases/product/updateProductController';
import { DeleteProduct } from './useCases/product/deleteProductController';

import { createUserController } from './useCases/user/CreateUser';
import { verifyUserSessionController } from './useCases/user/VerifyUserSession';
import { loginUserController } from './useCases/user/LoginUser';
import { getUserFromSessionIdController } from './useCases/user/GetUserFromSessionId';
import { getUserFromEmailController } from './useCases/user/GetUserFromEmail';

import { createPreferenceController } from './useCases/preference/CreatePreference';

import { createProductController } from './useCases/product/CreateProduct';
import { listProductByIdController } from './useCases/product/ListProductById';

import { storage } from './utils/GetStorage';
import { getImageUrl } from './utils/GetImageUrl';
import { listAllProductsController } from './useCases/product/ListAllProducts';

import { auth } from './middlewares/Auth';
import { createAddressController } from './useCases/address/CreateAddress';
import { findAddressesFromUserController } from './useCases/address/FindAddressesFromUser';

const router = Router();

router.get('/test', (req, res) => {
  return res.status(200).json({ message: 'test' });
});

router.get('/verify/user', async (req, res) => {
  return await verifyUserSessionController.handle(req, res);
});

router.get('/user/:email', async (req, res) => {
  return await getUserFromEmailController.handle(req, res);
});

router.post('/user', async (req, res) => {
  return await createUserController.handle(req, res);
});

router.post('/login', async (req, res) => {
  return await loginUserController.handle(req, res);
});

router.get('/user/session', async (req, res) => {
  return await getUserFromSessionIdController.handle(req, res);
});

router.post('/preference', async (req, res) => {
  return await createPreferenceController.handle(req, res);
});

router.post('/product', multer({ storage }).single('file'), async (req, res) => {
  return await createProductController.handle(req, res);
});

router.get('/product', async (req, res) => {
  return await listAllProductsController.handle(req, res);
});

router.get('/product/:id', async (req, res) => {
  return await listProductByIdController.handle(req, res);
});

router.get('/imageurl/:url', (req: Request, res: Response) => {
  console.log('teste');
  console.log(req.params.url);

  const url = getImageUrl(req.params.url);
  
  console.log(url);

  return url 
    ? res.status(200).json({ message: "url got successfully", url }) 
    : res.status(404).json({ message: "url not found" });
});

// router.get('/product', ListProduct.list);
// router.put('/product', UpdateProduct.update);
// router.delete('/product', DeleteProduct.delete);

router.post('/address', auth, async (req: any, res: Response) => {
  return await createAddressController.handle(req, res);
});

router.get('/addresses', auth, async (req: any, res: Response) => {
  return await findAddressesFromUserController.handle(req, res);
});

export { router };