import * as jwt from 'jsonwebtoken';

export default function createToken(email: string): string {
  const secret = process.env.JWT_SECRET || 'TFC';
  const generateToken = jwt.sign(email, secret);
  return generateToken;
}
