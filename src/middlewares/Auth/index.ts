import jwt from 'jsonwebtoken';
import { NextFunction } from 'express';

type Decoded = {
  id: string, 
  email: string,
  iat: number,
  exp: number,
}

const auth = (req: any, res: any, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader)
    return res.status(401).send({ unauth: true, error: 'No token' })

  const parts = authHeader.split(' ');

  if (parts.length !== 2)
    return res.status(401).send({ unauth: true, error: 'Token error' })

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ unauth: true, error: 'Token malformatted' });

  jwt.verify(token, process.env.SECRET || "", (err: any, decoded: any) => {
    if (err) 
      return res.status(401).send({ unauth: true, error: 'Token invalid' });
      

    if (decoded) {
      req.id = decoded.id;
      req.email = decoded.email;
    }

    return next();
  });
}

export { auth };