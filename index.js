const express = require("express");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
const Recipe = require("./models/recipe.models");

app.use(express.json());

initializeDatabase();

// 3. Create an API with route "/recipes" to create a new recipe in the recipes database. Make sure to handle errors properly. Test your API with Postman. Add the following recipe:
async function createRecipe(newRecipe) {
    try {
        const recipe = new Recipe(newRecipe);
        const saveRecipe = await recipe.save();
        return saveRecipe
    } catch (error) {
        throw error;
    }
};

app.post("/recipes", async(req, res) => {
    try {
        const savedRecipe = await createRecipe(req.body);
        res.status(200).json({message: "Recipe added successfully.", recipe: savedRecipe});
        
    } catch (error) {
        res.status(500).json({error: "Failed to add Recipe.", message: error.message})
    }
})

// 6. Create an API to get all the recipes in the database as a response. Make sure to handle errors properly.

async function readAllRecipe() {
    try {
        const allRecipes = await Recipe.find();
        return allRecipes;
        
    } catch (error) {
        throw error;
    }
}

app.get("/recipes", async(req, res) => {
    try {
        const recipes = await readAllRecipe();

        if(recipes.length != 0) {
            res.status(200).json({message: "Recipes fetched successfully.", data: recipes})
        } else {
            res.status(201).json({message: "No Recipe found."});
        }
        
    } catch (error) {
        res.status(500).json({message: "Error fecthing Recipe.", error: error.message})
    }
})

// 7. Create an API to get a recipe's details by its title. Make sure to handle errors properly.
async function readRecipeByTitle(title) {
    try {
        const recipeByTitle = await Recipe.find({title : title});
        return recipeByTitle;
    } catch (error) {
        throw error;
    }
}

app.get("/recipes/title/:recipeTitle", async(req, res) => {
    try {
        const recipe = await readRecipeByTitle(req.params.recipeTitle);

        if(recipe.length != 0) {
            res.status(200).json({message: "Recipe fetched successfully.", data: recipe})
        } else {
            res.status(201).json({message: "No Recipe found."})
        }

    } catch (error) {
        res.status(500).json({message: "Failed to fetched Recipe.", error: error.message});
    }
})

// 8. Create an API to get details of all the recipes by an author. Make sure to handle errors properly.
async function readRecipeByAuthor(author) {
    try {
        const recipeByAuthor = await Recipe.find({ author : author});
        return recipeByAuthor;
        
    } catch (error) {
        throw error;
    }
}

app.get("/recipes/author/:recipeAuthor", async(req, res) => {
    try {
        const recipe = await readRecipeByAuthor(req.params.recipeAuthor);

        if(recipe.length != 0) {
            res.status(200).json({message: "Recipe fetched suceesfully.", data: recipe})
        } else {
            res.status(201).json({message: "Recipe not found."});
        }
        
    } catch (error) {
        res.status(500).json({message: "Failed to fetched Recipe.", error: error.message});
    }
});

// 9. Create an API to get all the recipes that are of "Easy" difficulty level.
async function readRecipeByDifficulty(level) {
    try {
        const recipeByDifficulty = await Recipe.find({difficulty: level});
        return recipeByDifficulty;
        
    } catch (error) {
        throw error;
    }
}

app.get("/recipes/level/:recipesLevel", async(req, res) => {
    try {
        const recipe = await readRecipeByDifficulty(req.params.recipesLevel);

        if(recipe.length != 0) {
            res.status(200).json({message: "Recipe fetched successfully.", data: recipe});
        } else {
            res.status(201).json({message: "No Recipe found."});
        }
        
    } catch (error) {
        res.status(500).json({message: "Failed to fetched Recipe.", error: error.message})
    }
})

// 10. Create an API to update a recipe's difficulty level with the help of its id.
async function updateRecipeById(recipeId, dataToUpdate) {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, dataToUpdate, {new: true});
        return updatedRecipe;
        
    } catch (error) {
        throw error;
    }
}

app.post("/recipes/levels/difficulty/:recipeId", async(req, res) => {
    try {
        const recipe = await updateRecipeById(req.params.recipeId, req.body);

        if(recipe) {
            res.status(200).json({message: "Recipe updated successfully.", data: recipe})
        } else {
            res.status(201).json({message: "No Recipe found."});
        }
        
    } catch (error) {
        res.status(500).json({message: "Error to update Recipe.", error: error.message})
    }
})

// 11. Create an API to update a recipe's prep time and cook time with the help of its title. 
async function updateRecipeByTitle(recipeTitle, dataToUpdate) {
    try {
        const updatedRecipe = await Recipe.findOneAndUpdate({title : recipeTitle}, dataToUpdate, {new: true})

        return updatedRecipe;
        
    } catch (error) {
        throw error;
    }
}

app.post("/recipes/prepTime/:recipeTitle", async(req, res) => {

    try {
        const updatedRecipe = await updateRecipeByTitle(req.params.recipeTitle, req.body);

        if(updatedRecipe) {
            res.status(200).json({message: "Recipe updated successfully.", data: updatedRecipe})
        } else {
            res.status(201).json({message: "No Recipe found."})
        }
        
    } catch (error) {
        res.status(500).json({message: "Error to update Recipe.", error: error.message});
    }
})

// 12. Create an API to delete a recipe with the help of a recipe id. Send an error message "Recipe not found" if the recipe does not exist. Make sure to handle errors properly.
async function deleteRecipe(recipeId) {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

        return deletedRecipe;
        
    } catch (error) {
        throw error;
    }
}

app.delete("/recipes/:recipeId", async(req, res) => {
    try {
        const deletedRecipe = await deleteRecipe(req.params.recipeId)

        if(deletedRecipe) {
            res.status(200).json({message: "Recipe deleted successfully.", data: deletedRecipe})
        } else {
            res.status(201).json({message: "Recipe does not found."})
        }
        
    } catch (error) {
        res.status(500).json({message: "Error to update Recipe.", error: error.message})
    }
})
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
})