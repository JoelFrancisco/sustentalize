import { CreateProduct } from './controllers/product/createProduct';
import { Router } from "express";
import { CreateUser } from './controllers/user/createUser';
import { LoginUser } from "./controllers/user/loginUsers";
import { VerifySessionId } from "./controllers/user/verifySessionId";
import { ListProduct } from './controllers/product/listProductById';
import { UpdateProduct } from './controllers/product/updateProductController';
import { DeleteProduct } from './controllers/product/deleteProductController';

import { stripeProduct } from './controllers/stripeProduct';

const router = Router();

router.get('/test', (req, res) => {
  return res.status(200).json({ message: 'test' });
});

router.post('/user', CreateUser.create);
router.get('/verify', VerifySessionId.verify);
router.post('/login', LoginUser.login);

router.post('/product', CreateProduct.create);
router.get('/product', ListProduct.list);
router.put('/product', UpdateProduct.update);
router.delete('/product', DeleteProduct.delete);

router.get('/products', stripeProduct);

export { router };