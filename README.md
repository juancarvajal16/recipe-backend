# GraphQL TypeORM Api

Application contains graphql server and is integrated with TypeORM. Server is set up to run on port 4000.

## How to run
To run the application, first you need to install the packages:
```
npm install
```

Then you can run using command:
```
npm start
```

## Example GraphQL queries and mutations
- Get all users
```graphql
query {
  users {
    id
  	firstname
    lastname
    nickname
    email
    password
  }
}
```

- Get user by id
```graphql
query {
  user(id: "2") {
    id
    firstname
    lastname
    nickname
    email
    password
  }
}
```

- Create user
```graphql
mutation {
  createUser(
    data: {
      firstname: "Jacek",
      lastname: "Papuga",
      nickname: "Kapitan Dżak",
      email: "j.papuga@gmail.com",
      password: "typowehasłodżaka"
    }
  ) {
    id
    firstname
    lastname
    nickname
    email
    password
  }
}
```

- Update user
```graphql
mutation {
  updateUser(
    id: "2", 
    data: {
    	nickname: "Lunatyk"
  	}
  )
  {
    id
    firstname
    lastname
    nickname
    email
    password
  }
}
```

- Delete user
```graphql
mutation {
  deleteUser(id: "3")
}
```