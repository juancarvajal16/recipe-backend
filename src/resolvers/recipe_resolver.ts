import { Resolver, Query, Mutation, Arg, Int, Ctx, UseMiddleware, ResolverInterface, FieldResolver, Root } from "type-graphql";
import { Category } from "../entity/Category";
import { Recipe } from "../entity/Recipe";
import { User } from "../entity/User";
import { CreateRecipeInput } from '../inputs/create_recipe_input';
import { UpdateRecipeInput } from '../inputs/update_recipe_input';
import { isAuth } from "../isAuth";
import { MyContext } from "../MyContext";

@Resolver(of => Recipe)
export class RecipeResolver implements ResolverInterface<Recipe> {
  
  @Query(() => [Recipe])
  @UseMiddleware(isAuth)
  async getRecipes(
    @Arg('filter', { nullable:true }) filter: string,
    @Arg('term', { nullable:true }) term: string,
  ){
    if (filter && term){
      switch(filter){
        case "name": 
          return await Recipe.find( { where: `"name" ILIKE '%${term}%'` });
        case "description": 
          return await Recipe.find( { where: `"description" ILIKE '%${term}%'` });
        case "ingredient": 
          return await Recipe.createQueryBuilder('recipe')
            .where('recipe.ingredients::text ILIKE :ingredients', { ingredients: `%${term}%`})
            .getMany();
        case "category": 
          return await Recipe.createQueryBuilder('recipe')
            .leftJoinAndSelect("recipe.category", "category")
            .where('category.name ILIKE :name', { name: `%${term}%`})
            .getMany();
        default: throw new Error("Wrong filter!, select one of these: name, description, ingredient or category")
      }
    } else if (term) {
      return await Recipe.find( { where: `"name" ILIKE '%${term}%'` });
    }

    return await Recipe.find();
  }

  @Query(() => Recipe)
  @UseMiddleware(isAuth)
  async getOneRecipe(@Arg("id", type=>Int) id: number){
    return await Recipe.findOne({ where: { id }});
  }

  @Query(() => [Recipe])
  @UseMiddleware(isAuth)
  async getMyRecipes(@Ctx() { payload }: MyContext){
    return await Recipe.find({creatorId: payload?.userId});
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
  @UseMiddleware(isAuth)
  async deleteRecipe(@Arg("id", type=>Int) id: number) {
    const recipe = await Recipe.findOne({ where: { id }});
    if (!recipe) {
      throw new Error(`The recipe with id: ${id} does not exist!`);
    }
    await recipe.remove();
    return true;
    }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateRecipe(
    @Arg("id", type=>Int) id: number,
    @Arg("input", type=>UpdateRecipeInput) data: UpdateRecipeInput,
  ) {
    await Recipe.update({id}, data);
    return  true;
  }

  @FieldResolver()
  async category(
    @Root() recipe: Recipe): Promise<Category> {
    return (await Category.findOne({ where: { id:recipe.categoryId }}))!
  }

  @FieldResolver()
  async creator(
    @Root() recipe: Recipe): Promise<User> {
    return (await User.findOne({ where: { id:recipe.creatorId }}))!
  }
  
};