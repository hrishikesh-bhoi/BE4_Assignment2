const mongoose = require("mongoose");

// 1. Create a Mongoose model for a Recipe with the following attributes:

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Intermediate', 'Difficult'],
    },
    prepTime: {
        type: Number,
        required: true,
    },
    cookTime: {
        type: Number,
        required: true,
    },
    ingredients: [{
        type: String,
        required: true,
    },],
    instructions: [{
        type: String,
        required: true,
    }, ],
    imageUrl: {
        type: String,
        required: true,
    },
},
 {
    timestamps: true,
},);

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;