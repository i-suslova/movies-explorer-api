const { ERRORS, HTTP_STATUS } = require('../utils/constants/errorMessages');

module.exports = (err, req, res, next) => {
  const { statusCode = HTTP_STATUS.SERVER_ERROR_CODE, message } = err;
  res.status(statusCode).send({

    message: statusCode === HTTP_STATUS.SERVER_ERROR_CODE ? ERRORS.SERVER_ERROR : message,
  });
  next();
};
