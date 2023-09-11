const { Joi, celebrate } = require('celebrate');

const { urlRegex } = require('../utils/constants/urlRegex');
const { ERRORS } = require('../utils/constants/errorMessages');

module.exports.createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'any.required': ERRORS.DATA_REQUIRED,
    }),
    director: Joi.string().required().messages({
      'any.required': ERRORS.DATA_REQUIRED,
    }),
    duration: Joi.number().required().messages({
      'any.required': ERRORS.DATA_REQUIRED,
    }),
    year: Joi.string().required().messages({
      'any.required': ERRORS.DATA_REQUIRED,
    }),
    description: Joi.string().required().messages({
      'any.required': ERRORS.DATA_REQUIRED,
    }),
    image: Joi.string().required().pattern(urlRegex).messages({
      'string.pattern.base': ERRORS.INVALID_URL,
      'any.required': ERRORS.LINK_REQUIRED,
    }),
    trailerLink: Joi.string().required().pattern(urlRegex).messages({
      'string.pattern.base': ERRORS.INVALID_URL,
      'any.required': ERRORS.LINK_REQUIRED,
    }),
    thumbnail: Joi.string().required().pattern(urlRegex).messages({
      'string.pattern.base': ERRORS.INVALID_URL,
      'any.required': ERRORS.LINK_REQUIRED,
    }),
    movieId: Joi.number().required().messages({
      'any.required': ERRORS.DATA_REQUIRED,
    }),
    nameRU: Joi.string().required().messages({
      'any.required': ERRORS.NAME_RU_REQUIRED,
    }),
    nameEN: Joi.string().required().messages({
      'any.required': ERRORS.NAME_EN_REQUIRED,
    }),
  }),
});

module.exports.deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24).hex()
      .messages({
        'string.alphanum': ERRORS.INVALID_DATA,
        'string.length': ERRORS.INVALID_DATA,
        'string.hex': ERRORS.INVALID_DATA,
      }),
  }),
});
