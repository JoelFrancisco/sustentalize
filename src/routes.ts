import { CreateProduct } from './useCases/product/createProduct';
import { Router } from "express";

import { ListProduct } from './useCases/product/listProductById';
import { UpdateProduct } from './useCases/product/updateProductController';
import { DeleteProduct } from './useCases/product/deleteProductController';

import { createUserController } from './useCases/user/CreateUser';
import { verifyUserSessionController } from './useCases/user/VerifyUserSession';
import { loginUserController } from './useCases/user/LoginUser';
import { getUserFromSessionIdController } from './useCases/user/GetUserFromSessionId';
import { getUserFromEmailController } from './useCases/user/GetUserFromEmail';

import { createPreferenceControler } from './useCases/preference/CreatePreference';

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
})

router.post('/preference', async (req, res) => {
  return await createPreferenceControler.handle(req, res);
});

router.post('/product', CreateProduct.create);
router.get('/product', ListProduct.list);
router.put('/product', UpdateProduct.update);
router.delete('/product', DeleteProduct.delete);

export { router };