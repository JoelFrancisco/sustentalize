import { CreateProduct } from './useCases/product/createProduct';
import { Router } from "express";
import { CreateUser } from './useCases/user/createUser';
import { LoginUser } from "./useCases/user/loginUsers";
import { VerifySessionId } from "./useCases/user/verifySessionId";
import { ListProduct } from './useCases/product/listProductById';
import { UpdateProduct } from './useCases/product/updateProductController';
import { DeleteProduct } from './useCases/product/deleteProductController';

import { createUserController } from './useCases/user/CreateUser';

const router = Router();

router.get('/test', (req, res) => {
  return res.status(200).json({ message: 'test' });
});

router.post('/user', async (req, res) => {
  return await createUserController.handle(req, res);
});

router.get('/user/verify', VerifySessionId.verify);
router.post('/login', LoginUser.login);

router.post('/product', CreateProduct.create);
router.get('/product', ListProduct.list);
router.put('/product', UpdateProduct.update);
router.delete('/product', DeleteProduct.delete);

export { router };