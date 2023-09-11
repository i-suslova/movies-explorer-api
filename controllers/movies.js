const Movie = require('../models/movie');

const { ERRORS, HTTP_STATUS } = require('../utils/constants/errorMessages');

const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require('../utils/errors/indexErrors');

// получаем список фильмов
module.exports.getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

// создаём фильм
module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ ...req.body, owner })
    .then((movie) => res.status(HTTP_STATUS.CREATED_CODE).send(movie))

    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERRORS.INVALID_DATA));
      } else {
        next(err);
      }
    });
};

// удаляем сохранённый фильм по id владелеца
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  Movie.findById(movieId)
    .orFail(new NotFoundError(ERRORS.MOVIE_NOT_FOUND))
    .then((movie) => {
      // проверяем наличие movie (null или нет), потом сравниваем movie.owner с userId
      if (movie && movie.owner.equals(userId)) {
        return Movie.deleteOne({ _id: movieId })
          .then(() => res.send({ message: ERRORS.MOVIE_DELETED }))
          .catch(next);
      }
      throw new ForbiddenError(ERRORS.NO_PERMISSION);
    })
    .catch(next);
};
