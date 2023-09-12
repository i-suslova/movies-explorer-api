const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET } = require('../configs/config');
const { ERRORS, HTTP_STATUS } = require('../utils/constants/errorMessages');

const {
  BadRequestError,
  NotFoundError,
  ConflictError,
} = require('../utils/errors/indexErrors');

// создаем нового пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(HTTP_STATUS.CREATED_CODE).send({
        ...user.toObject(),
        password: undefined,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERRORS.INVALID_DATA));
      } else if (err.code === 11000) {
        next(new ConflictError(ERRORS.EMAIL_CONFLICT));
      } else {
        next(err);
      }
    });
};

// аутентификация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      res.send({ token });
    })
    .catch(next);
};

// получаем информацию о пользователе
module.exports.getUserInfo = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail()
    .then((user) => {
      const { email, name } = user;
      res.send({ email, name });
    })

    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(ERRORS.USER_NOT_FOUND));
      } else {
        next(err);
      }
    });
};

// обновляем сведения о пользователе
module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFoundError(ERRORS.USER_NOT_FOUND))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERRORS.INVALID_DATA));
      } else if (err.code === 11000) {
        next(new ConflictError(ERRORS.EMAIL_CONFLICT));
      } else {
        next(err);
      }
    });
};
