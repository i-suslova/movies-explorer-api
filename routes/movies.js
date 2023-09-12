const router = require('express').Router();
const { authUser } = require('../middlewares/auth');
const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  createMovieValidator,
  deleteMovieValidator,
} = require('../validators/movieValidator');

// роут для показа всех фильмов
router.get('/', authUser, getAllMovies);

// роут для создания фильма
router.post('/', authUser, createMovieValidator, createMovie);

// роут для удаления фильма по идентификатору
router.delete('/:movieId', authUser, deleteMovieValidator, deleteMovie);

module.exports = router;
