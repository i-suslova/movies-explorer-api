const router = require('express').Router();

const { NotFoundError } = require('../utils/errors/indexErrors');
const { ERRORS } = require('../utils/constants/errorMessages');
const { authUser } = require('../middlewares/auth');

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const authRouter = require('./auth');

router.use('/', authRouter);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

// несуществующий путь
router.use('/*', authUser, (req, res, next) => {
  next(new NotFoundError(ERRORS.PAGE_NOT_FOUND));
});

module.exports = router;
