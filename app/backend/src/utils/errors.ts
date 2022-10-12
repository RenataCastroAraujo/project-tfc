import { ErrorRequestHandler } from 'express';
import StatusCode from './statusCode';

const filterErrors: ErrorRequestHandler = (err, _req, res, _next) => {
  const { message } = err;
  switch (message) {
    case 'Incorrect email or password': res.status(StatusCode.UNAUTHORIZED).json({ message });
      break;
    case 'It is not possible to create a match with two equal teams':
      res.status(StatusCode.UNAUTHORIZED).json({ message });
      break;
    case 'Token must be a valid token' || 'jwt malformed':
      res.status(StatusCode.UNAUTHORIZED).json({ message });
      break;
    case 'jwt malformed':
      res.status(StatusCode.UNAUTHORIZED).json({ message: 'Token must be a valid token' });
      break;
    case 'There is no team with such id!':
      res.status(StatusCode.NOT_FOUND).json({ message });
      break;
    default: res.sendStatus(StatusCode.INTERNAL_SERVER_ERROR);
  }
};

export default filterErrors;
