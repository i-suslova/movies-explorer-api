const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors/indexErrors');

const { JWT_SECRET } = require('../configs/config');
const { ERRORS } = require('../utils/constants/errorMessages');

module.exports.authUser = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(ERRORS.UNAUTHORIZED));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(ERRORS.UNAUTHORIZED));
    return;
  }

  req.user = payload;

  next();
};
