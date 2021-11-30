import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ unauth: true, error: 'No token' })

  const parts = authHeader.split(' ');

  if (parts.length !== 2)
    return res.status(401).send({ unauth: true, error: 'Token error' })

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ unauth: true, error: 'Token malformatted' });

  jwt.verify(token, process.env.SECRET || "", (err, decoded) => {
    if (err) return res.status(401).send({ unauth: true, error: 'Token invalid' });

    if (decoded) {
      req.body.user_id = decoded.id;
      req.body.user_email = decoded.email;
    }

    return next();
  });
}

export { auth };