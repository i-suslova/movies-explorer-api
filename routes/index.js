const router = require('express').Router();

const errorHandler = require('../middlewares/errorHandler');
const { NotFoundError, RateLimitError } = require('../utils/errors/indexErrors');
const { ERRORS } = require('../utils/constants/errorMessages');

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const authRouter = require('./auth');

router.use('/', authRouter);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use((err, req, res, next) => {
  if (err instanceof RateLimitError) {
    errorHandler(err, req, res, next);
  } else {
    next(err);
  }
});

// несуществующий путь
router.use('/*', (req, res, next) => {
  next(new NotFoundError(ERRORS.PAGE_NOT_FOUND));
});

module.exports = router;
