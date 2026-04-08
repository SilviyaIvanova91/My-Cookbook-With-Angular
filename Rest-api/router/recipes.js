const express = require("express");
const router = express.Router();
const { recipeController } = require("../controllers");

router.get("/", recipeController.getRecipes);
router.get("/:recipeId", recipeController.getRecipeById);

module.exports = router;
