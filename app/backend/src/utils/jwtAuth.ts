import * as jwt from 'jsonwebtoken';

export default function createToken(email: string): string {
  const secret = process.env.JWT_SECRET || 'TFC';
  const generateToken = jwt.sign(email, secret);
  return generateToken;
}

function validateTokenLogin(authorization: string | undefined) {
  // if (!authorization) {
  //   throw new Error('Token must be a valid token');
  // }
  const secret = process.env.JWT_SECRET || 'TFC';
  const decoded = jwt.verify(authorization as string, secret);
  return decoded;
}

export { validateTokenLogin };
