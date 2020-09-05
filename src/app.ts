import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { typeDefs } from "./typeDefs";
import { resolvers } from './resolvers/RecipeResolvers'

export async function startServer(){
    const app = express();
    
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    })

    server.applyMiddleware({app, path: '/graphql'});

    return app;
}