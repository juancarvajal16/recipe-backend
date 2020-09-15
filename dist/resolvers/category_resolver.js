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
exports.CategoryResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Category_1 = require("../entity/Category");
const Recipe_1 = require("../entity/Recipe");
const isAuth_1 = require("../isAuth");
let CategoryResolver = class CategoryResolver {
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Category_1.Category.find();
        });
    }
    getOneCategory(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Category_1.Category.findOne(Object.assign(Object.assign({}, id ? { id } : {}), name ? { name } : {}));
        });
    }
    createCategory(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Category_1.Category.create({ name }).save();
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield Category_1.Category.findOne({ where: { id } });
            if (!category) {
                throw new Error(`The category with id: ${id} does not exist!`);
            }
            yield category.remove();
            return true;
        });
    }
    updateCategory(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Category_1.Category.update({ id }, { name });
            return true;
        });
    }
    recipes(category) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Recipe_1.Recipe.find({ where: { categoryId: category.id } });
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Category_1.Category]),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "getCategories", null);
__decorate([
    type_graphql_1.Query(() => Category_1.Category),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id", { nullable: true })),
    __param(1, type_graphql_1.Arg("name", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "getOneCategory", null);
__decorate([
    type_graphql_1.Mutation(() => Category_1.Category),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "createCategory", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id", type => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "deleteCategory", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id", type => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "updateCategory", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Category_1.Category]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "recipes", null);
CategoryResolver = __decorate([
    type_graphql_1.Resolver(of => Category_1.Category)
], CategoryResolver);
exports.CategoryResolver = CategoryResolver;
;
