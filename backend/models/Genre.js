import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: 32,
    trim: true,
  },
});

const genreModel =
  mongoose.models.Genre || mongoose.model("Genre", genreSchema);

export default genreModel;
