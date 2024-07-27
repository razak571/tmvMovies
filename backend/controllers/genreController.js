import genreModel from "../models/Genre.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    const existingGenre = await genreModel.findOne({ name });
    if (existingGenre) {
      return res.status(400).json({ error: "Genre Already Exists" });
    }

    const genre = await new genreModel({ name });
    if (!genre) {
      return res.status(400).json({ message: "Error Createion Genre" });
    }

    await genre.save();
    res.status(201).json({
      message: "success",
      data: { name: genre.name, id: genre._id.toString() },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

const updateGenre = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name required" });
  }
  try {
    const genre = await genreModel.findByIdAndUpdate(id, { name: name });
    // const genre = await genreModel.findOne({_id: id})
    if (!genre) {
      return res.status(404).json({ error: "Genre Not Found" });
    }

    const updatedGenre = await genreModel.findById(id);
    res
      .status(200)
      .json({ message: "Genre Updated Successfully", genre: updatedGenre });
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal Server Error :: ${error}`);
  }
});

const removeGenre = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const removedGenre = await genreModel.findByIdAndDelete(id);
    if (!removedGenre) {
      return res.status(404).json({ error: `${removedGenre} Genre Not Found` });
    }

    res.status(200).json({
      message: `${removedGenre.name} Genre Removed Successully`,
      name: removedGenre.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error while removing genre :: ${error}` });
  }
});

const listallGenre = asyncHandler(async (req, res) => {
  try {
    const allGenres = await genreModel.find({});

    if (allGenres === 0) {
      return res.status(404).json({ error: "Generes not found!" });
    }

    res.status(200).json(allGenres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

const readGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await genreModel.findById(id);
    if (!genre) {
      return res.status(404).send("Genre not found!");
    }
    res.status(200).json(genre);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export { createGenre, updateGenre, removeGenre, listallGenre, readGenre };
