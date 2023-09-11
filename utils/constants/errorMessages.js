module.exports = {
  ERRORS: {
    NAME_MIN_LENGTH: 'Имя должно содержать как минимум 2 символа.',
    NAME_MAX_LENGTH: 'Имя не должно превышать 30 символов.',
    NAME_REQUIRED: 'Имя обязательно для заполнения.',
    EMAIL_FORMAT: 'Некорректный формат электронной почты.',
    EMAIL_REQUIRED: 'Электронная почта обязательна.',
    PASSWORD_REQUIRED: 'Пароль обязателен.',
    INVALID_URL: 'Некорректный URL.',
    INVALID_ID: 'Некорректный ID.',
    INVALID_DATA: 'Некорректные данные.',
    INVALID_URL_EMAIL: 'Неправильные почта или пароль.',
    MOVIE_ID_REQUIRED: 'ID фильма обязателен.',
    LINK_REQUIRED: 'Ссылка обязательна.',
    DATA_REQUIRED: 'Данные обязательны.',
    NAME_RU_REQUIRED: 'Название на русском обязательно.',
    NAME_EN_REQUIRED: 'Название на английском обязательно.',
    MOVIE_NOT_FOUND: 'Фильм не найден.',
    USER_NOT_FOUND: 'Пользователь не найден.',
    PAGE_NOT_FOUND: 'Страница не найдена.',
    EMAIL_CONFLICT: 'Пользователь с таким email уже существует.',
    MOVIE_DELETED: 'Фильм успешно удален.',
    NO_PERMISSION: 'У вас нет прав для удаления этого фильма.',
    TOO_MANY_REQUESTS: 'Слишком много запросов с вашего IP, пожалуйста, попробуйте позже.',
    UNAUTHORIZED: 'Необходима авторизация.',
    SERVER_ERROR: 'На сервере произошла ошибка.',
  },
  HTTP_STATUS: {
    CREATED_CODE: 201,
    BAD_REQUEST_CODE: 400,
    UNAUTHORIZED_CODE: 401,
    FORBIDDEN_CODE: 403,
    NOT_FOUND_CODE: 404,
    CONFLICT_CODE: 409,
    RATE_LIMIT_CODE: 429,
    SERVER_ERROR_CODE: 500,
  },
};