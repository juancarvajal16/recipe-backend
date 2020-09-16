"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Category_1 = require("../entity/Category");
const Recipe_1 = require("../entity/Recipe");
const User_1 = require("../entity/User");
const create_recipe_input_1 = require("../inputs/create_recipe_input");
const update_recipe_input_1 = require("../inputs/update_recipe_input");
const isAuth_1 = require("../isAuth");
let RecipeResolver = class RecipeResolver {
    getRecipes(filter, term) {
        return __awaiter(this, void 0, void 0, function* () {
            if (filter && term) {
                switch (filter) {
                    case "name":
                        return yield Recipe_1.Recipe.find({ where: `"name" ILIKE '%${term}%'` });
                    case "description":
                        return yield Recipe_1.Recipe.find({ where: `"description" ILIKE '%${term}%'` });
                    case "ingredient":
                        return yield Recipe_1.Recipe.createQueryBuilder('recipe')
                            .where('recipe.ingredients::text ILIKE :ingredients', { ingredients: `%${term}%` })
                            .getMany();
                    case "category":
                        return yield Recipe_1.Recipe.createQueryBuilder('recipe')
                            .leftJoinAndSelect("recipe.category", "category")
                            .where('category.name ILIKE :name', { name: `%${term}%` })
                            .getMany();
                    default: throw new Error("Wrong filter!, select one of these: name, description, ingredient or category");
                }
            }
            else if (term) {
                return yield Recipe_1.Recipe.find({ where: `"name" ILIKE '%${term}%'` });
            }
            return yield Recipe_1.Recipe.find();
        });
    }
    getOneRecipe(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Recipe_1.Recipe.findOne({ where: { id } });
        });
    }
    getMyRecipes({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Recipe_1.Recipe.find({ creatorId: payload === null || payload === void 0 ? void 0 : payload.userId });
        });
    }
    createRecipe(data, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = payload.userId;
            const category = yield Category_1.Category.findOne(data.categoryId);
            if (!category) {
                throw new Error("It does not exist a category with that id");
            }
            const newRecipe = Object.assign(Object.assign({}, data), { creatorId: userId });
            console.log(newRecipe);
            return yield Recipe_1.Recipe.create(newRecipe).save();
        });
    }
    deleteRecipe(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const recipe = yield Recipe_1.Recipe.findOne({ where: { id } });
            if (!recipe) {
                throw new Error(`The recipe with id: ${id} does not exist!`);
            }
            yield recipe.remove();
            return true;
        });
    }
    updateRecipe(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Recipe_1.Recipe.update({ id }, data);
            return true;
        });
    }
    category(recipe) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield Category_1.Category.findOne({ where: { id: recipe.categoryId } }));
        });
    }
    creator(recipe) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield User_1.User.findOne({ where: { id: recipe.creatorId } }));
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Recipe_1.Recipe]),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('filter', { nullable: true })),
    __param(1, type_graphql_1.Arg('term', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "getRecipes", null);
__decorate([
    type_graphql_1.Query(() => Recipe_1.Recipe),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id", type => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "getOneRecipe", null);
__decorate([
    type_graphql_1.Query(() => [Recipe_1.Recipe]),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "getMyRecipes", null);
__decorate([
    type_graphql_1.Mutation(() => Recipe_1.Recipe),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_recipe_input_1.CreateRecipeInput, Object]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "createRecipe", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id", type => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "deleteRecipe", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id", type => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("input", type => update_recipe_input_1.UpdateRecipeInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_recipe_input_1.UpdateRecipeInput]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "updateRecipe", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Recipe_1.Recipe]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "category", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Recipe_1.Recipe]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "creator", null);
RecipeResolver = __decorate([
    type_graphql_1.Resolver(of => Recipe_1.Recipe)
], RecipeResolver);
exports.RecipeResolver = RecipeResolver;
;
