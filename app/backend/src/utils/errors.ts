import { ErrorRequestHandler } from 'express';
import StatusCode from './statusCode';

const filterErrors: ErrorRequestHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'Invalid': res.status(StatusCode.UNAUTHORIZED).json({ message });
      break;
    default: res.sendStatus(500);
  }
};

export default filterErrors;
