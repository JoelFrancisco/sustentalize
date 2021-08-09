import { Router } from "express";
import { CreateUser } from './controllers/createUser';

const router = Router();

router.get('/test', (req, res) => {
  return res.status(200).json({ message: 'test' });
});

router.post('/user', CreateUser.create);

export { router };