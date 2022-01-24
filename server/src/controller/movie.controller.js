import _, { join } from "lodash";
import dbErrorHandler from "../helpers/dbErrorHandler";
import movieModel from "../models/movie.model";

const movieById = (req, res, next, id) => {
  movieModel.findById(id).exec((err, movie) => {
    if (err || !movie) {
      return res.json({ error: "Movie not found" });
    }

    req.profile = movie;
    next();
  });
};

const create = (req, res, next) => {
  const movie = new movieModel(req.body);

  movie.save((err, result) => {
    if (err) {
      return res.json({ error: dbErrorHandler.getErrorMessage(err) });
    }
    res.status(200).json({ message: "Successfully added movie to favorites!" });
  });
};

const list = (req, res) => {
  movieModel.find((err, movies) => {
    if (err) {
      return res.json({
        error: dbErrorHandler.getErrorMessage(err),
      });
    }
    res.json(movies);
  });
};

const read = (req, res) => {
  res.status(200).json(req.profile);
};

const remove = (req, res, next) => {
  let movie = req.profile;

  movie.remove((err, deletedMovie) => {
    if (err) {
      return res.json({ error: dbErrorHandler.getErrorMessage(err) });
    }

    res.json(deletedMovie);
  });
};

const update = (req, res, next) => {
  let movie = req.profile;
  let data = req.body;

  movie = _.extend(movie, data);

  movie.save((err) => {
    if (err) {
      return re.json({ error: dbErrorHandler.getErrorMessage() });
    }

    res.status(200).json(movie);
  });
};

export default { movieById, create, list, read, update, remove };
