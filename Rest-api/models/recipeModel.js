const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    comments: [
      {
        username: { type: String, required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: { createdAt: "created_at" } },
);

module.exports = mongoose.model("Recipe", recipeSchema);
