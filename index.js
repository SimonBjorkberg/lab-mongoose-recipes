const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })

  // insert one recipe
  .then(() => {
    return Recipe.create(data[0]);
  })
  .then((recipe) => {
    console.log(recipe.title);
    return Recipe.deleteMany();
  })

  // insert many recipes
  .then(() => {
    return Recipe.insertMany(data);
  })

  // shows all the titles
  .then((recipes) => {
    recipes.forEach((recipe) => {
      console.log(recipe.title);
    });
    return recipes;
  })

  // updates the recipe with the title 'Rigatoni alla Genovese' and turns the duration to 100 instead of 220
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })

  // logs the new recipe
  .then((updatedRecipe) => {
    console.log(updatedRecipe);
  })

  // removes the recipe with the title of 'Carrot Cake'
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })

  // logs that the recipe was deleted
  .then((removedRecipe) => {
    console.log("removed a recipe", removedRecipe);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// closes the connection
mongoose.connection
  .close()
  .then(() => {
    console.log("connection closed");
  })
  .catch((err) => {
    console.log("for whatever reason it did not close :(", err);
  });
