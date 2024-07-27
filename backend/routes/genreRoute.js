import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createGenre,
  updateGenre,
  removeGenre,
  listallGenre,
  readGenre,
} from "../controllers/genreController.js";

const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, createGenre);
router.get("/list-all", listallGenre);
router
  .route("/:id")
  .put(authenticate, authorizeAdmin, updateGenre)
  .delete(authenticate, authorizeAdmin, removeGenre)
  .get(readGenre);

export default router;
