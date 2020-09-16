# GraphQL TypeORM API

Application contains graphql server and is integrated with TypeORM. Server is set up to run on port 3000.

## How to run
1. To run the application, first you need to install the packages:
```
npm install
```

2. Create postgres database

3. Setup database settings inside ormconfig.json file

4. Then you can run using command:
```
npm start
```

## Example GraphQL signup and login

- Sign up user
```graphql
mutation {
 signUp (name:"juan", email: "juan@gmail.com", password: "juan123"){
   name
   email
 }
}
```

- Login user
```graphql
mutation {
 login (email: "juan@gmail.com", password: "juan123"){
  token
 }
}
```

## Authentication
To query/mutate recipes/categories is needed that the user is authenticated. In other words, a token (JWT) must be passed in http header.

For example:
```
{
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYwMDEzMTg3NSwiZXhwIjoxNjAwMjE4Mjc1fQ.t7W4c6b_nUa3q4FL1Q2xs8SmdnSDBh2L-rJBogk11J8"
}
```

## Example GraphQL mutations
- Create recipe
```graphql
mutation {
 createRecipe(input:{
  name:"Arroz con Coca-Cola", 
  description:"es un delicioso acompañamiento para carne de cerdo asada o pollo asado",
  ingredients:"{arroz, coca-cola, cebolla}",
  categoryId:1
 }) {
  id
  name
  description
  ingredients
  category
   {
    id
    name
   }
 }
}
```
- Create category
```graphql
mutation {
 createCategory(name:"Ensaladas") {
  id
  name
 }
}
```
- Update recipe
```graphql
mutation {
  updateRecipe(id:5, input:{
    ingredients:"{huevo, azucar, harina, polvo de hornear}"
  })
}
```
- Update category
```graphql
mutation {
  updateCategory(id:3, name:"Postres")
}
```
- Delete recipe
```graphql
mutation {
 deleteRecipe (id:8)
}
```
- Delete category
```graphql
mutation {
 deleteCategory (id:4)
}
```

## Example Queries
- Get all recipes
```graphql
query {
 getRecipes {
  id
  name
  description
  ingredients
  category{
    id
    name
  }
 }
}
- Get one recipe
```graphql
query {
 getOneRecipe(id:4){
  id
  name
  description
  ingredients
  category{
    name
  }
 }
}
```
- Get all categories
```graphql
query {
 getCategories{
  id
  name
  recipes{
    name
  }
 }
}
```
- Get one category
```graphql
query {
 getOneCategory(id:2){
  id
  name
  recipes{
    name
  }
 }
}
```
- Get all recipes created by authenticated user 
```graphql
query {
 getMyRecipes {
  id
  name
  description
  ingredients
  category{
    id
    name
  }
 }
}
```

## Example Filtering
User can query all the recipes filtering by category, name, ingredient or description.
- Query all recipes that contain a specific ingredient
```graphql
query {
 getRecipes (filter:"ingredient", term:"harina") {
  id
  name
  description
  ingredients
  category{
    id
    name
  }
 }
}
```
- Query all recipes that contain a specific term in their description
```graphql
query {
 getRecipes (filter:"description", term:"popular") {
  id
  name
  description
  ingredients
  category{
    id
    name
  }
 }
}
```