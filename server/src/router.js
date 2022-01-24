import express from "express";
import movieController from "./controller/movie.controller";

const router = express.Router();

router.route("/movie/add").post(movieController.create);

router.route("/movie/all").get(movieController.list);

router.param("movieId", movieController.movieById);

router
  .route("/movie/single/:movieId")
  .get(movieController.read)
  .put(movieController.update)
  .delete(movieController.remove);

export default router;
