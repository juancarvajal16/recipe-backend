import { Recipe } from "../entity/Recipe";

const {recipes} = require("../constants")
export const resolvers = {
  Query: {
    recipes: () => recipes
  },
  
};