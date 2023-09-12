const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { UnauthorizedError } = require('../utils/errors/indexErrors');
const { ERRORS } = require('../utils/constants/errorMessages');

// определение схемы для пользователей
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: ERRORS.EMAIL_FORMAT,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        const err = new UnauthorizedError(ERRORS.USER_NOT_FOUND);
        return Promise.reject(err);
      }

      return bcrypt.compare(password, user.password)
        .then((passwordsMatch) => {
          if (!passwordsMatch) {
            const err = new UnauthorizedError(ERRORS.INVALID_URL_EMAIL);
            return Promise.reject(err);
          }
          return Promise.resolve(user);
        });
    });
};

// создание модели для пользователей
module.exports = mongoose.model('user', userSchema);
