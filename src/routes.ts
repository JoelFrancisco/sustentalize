import { CreateProduct } from './controllers/product/createProduct';
import { Router } from "express";
import { CreateUser } from './controllers/user/createUser';
import { LoginUser } from "./controllers/user/loginUsers";
import { VerifySessionId } from "./controllers/user/verifySessionId";

const router = Router();

router.get('/test', (req, res) => {
  return res.status(200).json({ message: 'test' });
});

router.post('/user', CreateUser.create);
router.get('/verify', VerifySessionId.verify);
router.post('/login', LoginUser.login);

router.post('/product', CreateProduct.create);

export { router };