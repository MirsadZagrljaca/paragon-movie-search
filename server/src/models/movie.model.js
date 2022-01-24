import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  cover: {
    type: String,
    trim: true,
    required: "Movie Cover is Required!",
  },
  title: {
    type: String,
    trim: true,
    required: "Movie Title is Required!",
  },
  year: {
    type: String,
    required: "Movie Year of Release is Required!",
  },
  rank: {
    type: String,
    required: "Movie Rank is required!",
  },
  type: {
    type: String,
    required: "Movie type is required",
  },
  rapidId: {
    type: String,
    required: "Movie id is Required!",
  },
  isFavourite: {
    type: Boolean,
  },
});

export default mongoose.model("Movie", MovieSchema);
