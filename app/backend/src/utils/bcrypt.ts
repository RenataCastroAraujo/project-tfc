import * as bcrypt from 'bcryptjs';

function encryptPassword(password: string, hash: string) {
  const auth = bcrypt.compare(password, hash);
  return auth;
}

export default encryptPassword;
