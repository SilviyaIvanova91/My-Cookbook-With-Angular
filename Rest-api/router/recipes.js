const express = require("express");
const router = express.Router();
const { recipeController } = require("../controllers");
const { auth } = require("../utils");

router.get("/", recipeController.getRecipes);
router.get("/:recipeId", recipeController.getRecipeById);
router.post("/:recipeId/comments", recipeController.addComment);
router.post("/", auth(), recipeController.createRecipe);
router.patch("/:recipeId", auth(), recipeController.updateRecipe);
router.delete("/:recipeId", auth(), recipeController.deleteRecipe);

module.exports = router;
