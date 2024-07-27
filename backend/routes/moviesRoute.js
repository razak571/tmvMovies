import { Router } from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateSpecificMovie,
  movieReview,
  deleteMovie,
  deleteComment,
  getNewMovies,
  getTopMovies,
  getRandomMovies,
} from "../controllers/moviesController.js";
import checkId from "../middlewares/checkId.js";

const router = Router();

// Public Routes
router.get("/", getAllMovies);
router.route("/new-movies").get(getNewMovies);
router.route("/top-movies").get(getTopMovies);
router.get("/random-movies", getRandomMovies);
router.get("/:id", getSpecificMovie);

// Restricted Routes
router.post("/reviews/:id", authenticate, checkId, movieReview);

// Admin
router
  .post("/", authenticate, authorizeAdmin, createMovie)
  .put("/:id", authenticate, authorizeAdmin, updateSpecificMovie)
  .delete("/remove-comment", authenticate, authorizeAdmin, deleteComment)
  .delete("/:id", authenticate, authorizeAdmin, checkId, deleteMovie);

export default router;
