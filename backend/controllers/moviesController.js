import asyncHandler from "../middlewares/asyncHandler.js";
import movieModel from "../models/Movie.js";

const createMovie = asyncHandler(async (req, res) => {
  try {
    const newMovie = new movieModel(req.body);
    const savedMovie = await newMovie.save();
    res.json(savedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const getAllMovies = async (req, res) => {
  try {
    const allMovies = await movieModel.find({});
    if (allMovies.length === 0) {
      return res.status(404).json({ error: "Movies are not found" });
    }

    res.status(200).json(allMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getSpecificMovie = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await movieModel.findById(id);
    if (!movie) {
      return res.status(404).send({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const updateSpecificMovie = async (req, res) => {
  try {
    const { id } = req.params;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "You must send data to update!" });
    }
    const updatedMovie = await movieModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedMovie) {
      return res.status(404).json({ error: "Movie not found!!" });
    }

    // const getUpdatedMovie = await movieModel.findById(id); or {new : true}
    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const movieReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const movie = await movieModel.findById(id);
    if (movie) {
      const alreadyReviewed = movie.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Movie alredy reviewd");
      }
      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      movie.reviews.push(review);
      movie.numReviews = movie.reviews.length;
      movie.rating =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

      await movie.save();

      res.status(201).json({ message: "Review Added" });
    } else {
      res.status(404);
      throw new Error("Movie not found!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMovie = await movieModel.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ error: "Moview not found!" });
    }
    res.status(200).json({ message: "Moview deleted successully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = asyncHandler(async (req, res) => {
  try {
    const { movieId, reviewId } = req.body;
    const movie = await movieModel.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found!" });
    }
    const reviewIndex = movie.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );
    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Comment not found!" });
    }

    movie.reviews.splice(reviewIndex, 1);
    movie.numReviews = movie.reviews.length;
    movieReview.rating =
      movie.reviews.length > 0
        ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
          movie.reviews.length
        : 0;

    await movie.save();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

const getNewMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await movieModel.find({}).sort({ createdAt: -1 }).limit(10);
    if (!movies === 0) {
      return res.status(404).json({ error: "Movies Not Found, Vist Later!" });
    }

    res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

const getTopMovies = async (req, res) => {
  try {
    const topRatedMovies = await movieModel
      .find()
      .sort({ numReviews: -1 })
      .limit(4);
    res.status(200).json(topRatedMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getRandomMovies = asyncHandler(async (req, res) => {
  try {
    const randomMovies = await movieModel.aggregate([{ $sample: { size: 5 } }]);
    res.status(200).json(randomMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
export {
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
};
