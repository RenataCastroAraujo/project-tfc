import { ErrorRequestHandler } from 'express';
import StatusCode from './statusCode';

const filterErrors: ErrorRequestHandler = (err, _req, res, _next) => {
  const { message } = err;
  switch (message) {
    case 'Incorrect email or password': res.status(StatusCode.UNAUTHORIZED).json({ message });
      break;
    default: res.sendStatus(StatusCode.INTERNAL_SERVER_ERROR);
  }
};

export default filterErrors;
