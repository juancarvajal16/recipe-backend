import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from 'typeorm';
import { buildSchema } from "type-graphql";
import { RecipeResolver } from './resolvers/recipe_resolver';
import { UserResolver } from './resolvers/user_resolver';
import { CategoryResolver } from "./resolvers/category_resolver";

async function startServer() {

    // Create TypeORM connection
    await createConnection();

    const app = express();
    const path = "/graphql";

    // Build GraphQL schema
    const schema = await buildSchema({
        resolvers: [RecipeResolver, CategoryResolver, UserResolver],
        validate: false
    });

     // Create GraphQL server
    const server = new ApolloServer({ schema, context: ({ req }) => ({ req }) });

    // Apply the GraphQL server middleware
    server.applyMiddleware({app, path});

    // Launch the express server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`);
    });

}

startServer();