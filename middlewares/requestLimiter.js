const rateLimit = require('express-rate-limit');

const { ERRORS } = require('../utils/constants/errorMessages');

// ограничения запросов (100 запросов в час)
module.exports.limiter = rateLimit({
  windowMs: 60 * 60 * 100,
  max: 100,
  message: ERRORS.TOO_MANY_REQUESTS,
});
