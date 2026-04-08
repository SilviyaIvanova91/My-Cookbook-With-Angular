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

module.exports = {
  getRecipes,
  getRecipeById,
};
