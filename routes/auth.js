const router = require('express').Router();

const { createUser, login } = require('../controllers/users');
const { createUserValidator, loginValidator } = require('../validators/userValidator');

// роут для регистрации пользователя
router.post('/signup', createUserValidator, createUser);

// роут для аутентификации
router.post('/signin', loginValidator, login);

module.exports = router;
