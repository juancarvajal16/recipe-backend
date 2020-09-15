"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const recipe_resolver_1 = require("./resolvers/recipe_resolver");
const user_resolver_1 = require("./resolvers/user_resolver");
const category_resolver_1 = require("./resolvers/category_resolver");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create TypeORM connection
        yield typeorm_1.createConnection();
        const app = express_1.default();
        const path = "/graphql";
        // Build GraphQL schema
        const schema = yield type_graphql_1.buildSchema({
            resolvers: [recipe_resolver_1.RecipeResolver, category_resolver_1.CategoryResolver, user_resolver_1.UserResolver],
            validate: false
        });
        // Create GraphQL server
        const server = new apollo_server_express_1.ApolloServer({ schema, context: ({ req }) => ({ req }) });
        // Apply the GraphQL server middleware
        server.applyMiddleware({ app, path });
        // Launch the express server
        app.listen(3000, () => {
            console.log("Server started on http://localhost:3000/graphql");
        });
    });
}
startServer();
