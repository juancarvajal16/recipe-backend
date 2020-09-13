import { Resolver, Query, Mutation, Arg, Int, Ctx, UseMiddleware } from "type-graphql";
import { Recipe } from "../entity/Recipe";
import { Repository } from "typeorm";
import { CreateRecipeInput } from '../inputs/create_recipe_input';
import { UpdateRecipeInput } from '../inputs/update_recipe_input';
import { isAuth } from "../isAuth";
import { MyContext } from "../MyContext";

@Resolver()
export class RecipeResolver {
  
  @Query(() => [Recipe])
  @UseMiddleware(isAuth)
  async getRecipes(){
    return await Recipe.find()
  }

  @Query(() => Recipe)
  @UseMiddleware(isAuth)
  async getOneRecipe(@Arg("id", type=>Int) id: number){
    return await Recipe.findOne({ where: { id }})
  }

  @Query(() => Recipe)
  @UseMiddleware(isAuth)
  async getMyRecipes(@Ctx() { payload }: MyContext){
    return await Recipe.find({ creatorId: payload!.userId})
  }

  @Mutation(() => Recipe)
  @UseMiddleware(isAuth)
  async createRecipe(
    @Arg("input") data: CreateRecipeInput,
    @Ctx() { payload }: MyContext,
  ) {
    const userId = payload!.userId;
    const newRecipe = {...data, creatorId:userId};
    console.log(newRecipe);
    return await Recipe.create(newRecipe).save();
  }

  @Mutation(() => Boolean)
  async deleteRecipe(@Arg("id", type=>Int) id: number) {
  const recipe = await Recipe.findOne({ where: { id }});

  if (!recipe) {
    throw new Error(`The recipe with id: ${id} does not exist!`);
  }

  await recipe.remove();
  return true;
}

  @Mutation(() => Boolean)
  async updateRecipe(
    @Arg("id", type=>Int) id: number,
    @Arg("input", type=>UpdateRecipeInput) data: UpdateRecipeInput,
  ) {
    await Recipe.update({id}, data);
    return  true;
  }

};