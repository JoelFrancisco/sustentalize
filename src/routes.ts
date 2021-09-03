import { Router } from "express";
import { CreateUser } from './controllers/createUser';
import { LoginUser } from "@controllers/loginUsers";
import { VerifySessionId } from "@controllers/verifySessionId";

const router = Router();

router.get('/test', (req, res) => {
  return res.status(200).json({ message: 'test' });
});

router.post('/user', CreateUser.create);
router.post('/verify', VerifySessionId.verify);
router.post('/login', LoginUser.login);

export { router };