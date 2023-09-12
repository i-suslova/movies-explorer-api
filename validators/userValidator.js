const { Joi, celebrate } = require('celebrate');

const { ERRORS } = require('../utils/constants/errorMessages');

module.exports.createUserValidator = celebrate({

  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': ERRORS.NAME_MIN_LENGTH,
        'string.max': ERRORS.NAME_MAX_LENGTH,
        'any.required': ERRORS.NAME_REQUIRED,
      }),

    email: Joi.string().required().email()
      .messages({
        'string.email': ERRORS.EMAIL_FORMAT,
        'any.required': ERRORS.EMAIL_REQUIRED,
      }),
    password: Joi.string().required()
      .messages({
        'any.required': ERRORS.PASSWORD_REQUIRED,
      }),
  }),
});

module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.email': ERRORS.EMAIL_FORMAT,
        'any.required': ERRORS.EMAIL_REQUIRED,
      }),
    password: Joi.string().required()
      .messages({
        'any.required': ERRORS.PASSWORD_REQUIRED,
      }),
  }),
});

module.exports.updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': ERRORS.NAME_MIN_LENGTH,
        'string.max': ERRORS.NAME_MAX_LENGTH,
        'any.required': ERRORS.NAME_REQUIRED,
      }),

    email: Joi.string().required().email()
      .messages({
        'string.email': ERRORS.EMAIL_FORMAT,
        'any.required': ERRORS.EMAIL_REQUIRED,
      }),
  }),
});
