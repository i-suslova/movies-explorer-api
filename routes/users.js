const router = require('express').Router();

const { authUser } = require('../middlewares/auth');
const { updateUser, getUserInfo } = require('../controllers/users');
const { updateUserValidator } = require('../validators/userValidator');

// роут для получения информации о текущем пользователе
router.get('/me', authUser, getUserInfo);

// роут для обновления профиля
router.patch('/me', authUser, updateUserValidator, updateUser);

module.exports = router;
