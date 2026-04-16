const express = require("express");
const router = express.Router();
const { recipeController } = require("../controllers");

router.get("/", recipeController.getRecipes);
router.get("/:recipeId", recipeController.getRecipeById);
router.post("/:recipeId/comments", recipeController.addComment);
router.post("/", recipeController.createRecipe);

module.exports = router;
