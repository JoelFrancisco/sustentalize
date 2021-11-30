import jwt from 'jsonwebtoken';

class HandleTokenGeneration {
  generateToken(id: string, email: string) {
    return jwt.sign({ id, email }, process.env.SECRET || "", {
      expiresIn: 86400
    });
  }
}

export { HandleTokenGeneration };