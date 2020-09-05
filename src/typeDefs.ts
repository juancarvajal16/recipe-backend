import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    recipes: [Recipe!]
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    recipes: [Recipe!]
  }

  type Recipe {
    id: ID!
    name: String!
    description: String!
    ingredients: [String!]
    category: String!
    user: User!
  }

  type Category {
    id: ID!
    name: String!
    recipes: [Recipe]!
  }
`;