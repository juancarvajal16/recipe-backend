import { Resolver, Query, Mutation, Arg, Int, UseMiddleware, ResolverInterface, FieldResolver, Root } from "type-graphql";
import { Category } from "../entity/Category";
import { Recipe } from "../entity/Recipe";
import { isAuth } from "../isAuth";

@Resolver(of => Category)
export class CategoryResolver implements ResolverInterface<Category> {
  
  @Query(() => [Category])
  @UseMiddleware(isAuth)
  async getCategories(){
    return await Category.find()
  }

  @Query(() => Category!)
  @UseMiddleware(isAuth)
  async getOneCategory(
    @Arg("id", { nullable: true }) id: number,
    @Arg("name", { nullable: true }) name: string,
    ){
    return await Category.findOne({
      ...id ? {id}:{},
      ...name ? {name}:{}
    });
  }

  @Mutation(() => Category)
  @UseMiddleware(isAuth)
  async createCategory(
    @Arg("name") name: string,
  ) {
    return await Category.create({ name }).save();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteCategory(@Arg("id", type=>Int) id: number) {
    const category = await Category.findOne({ where: { id }});
    if (!category) {
      throw new Error(`The category with id: ${id} does not exist!`);
    }
    await category.remove();
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateCategory(
    @Arg("id", type=>Int) id: number,
    @Arg("name") name: string,
  ) {
    await Category.update({id}, {name});
    return true;
  }

  @FieldResolver()
  async recipes(
    @Root() category: Category): Promise<Recipe[]> {
    return await Recipe.find({ where: { categoryId:category.id }})
  }
  
};