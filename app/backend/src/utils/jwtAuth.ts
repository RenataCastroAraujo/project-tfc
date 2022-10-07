import * as jwt from 'jsonwebtoken';
import Err from './errorClass';

export default function createToken(email: string): string {
  const secret = process.env.JWT_SECRET || 'TFC';
  const generateToken = jwt.sign(email, secret);
  return generateToken;
}

function validateTokenLogin(authorization: string | undefined) {
  if (!authorization) {
    throw new Err(404, 'Token not found');
  }
  try {
    const secret = process.env.JWT_SECRET || 'TFC';
    const decoded = jwt.verify(authorization, secret);
    return decoded;
  } catch (error) {
    return error;
  }
}

export { validateTokenLogin };
