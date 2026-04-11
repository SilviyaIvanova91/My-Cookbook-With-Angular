const { recipeModel } = require("../models");

function getRecipes(req, res, next) {
  recipeModel
    .find()
    .sort({ created_at: -1 })
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch(next);
}

function getRecipeById(req, res, next) {
  const { recipeId } = req.params;

  recipeModel
    .findById(recipeId)
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.status(200).json(recipe);
    })
    .catch(next);
}

function addComment(req, res, next) {
  const { recipeId } = req.params;
  const { username, text } = req.body;

  if (!username || !text) {
    return res.status(400).json({ message: "username and text are required" });
  }

  recipeModel
    .findByIdAndUpdate(
      recipeId,
      { $push: { comments: { username, text } } },
      { new: true }
    )
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      const added = recipe.comments[recipe.comments.length - 1];
      res.status(201).json(added);
    })
    .catch(next);
}

module.exports = {
  getRecipes,
  getRecipeById,
  addComment,
};
