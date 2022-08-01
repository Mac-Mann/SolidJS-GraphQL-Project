const typeDefs = `
  type Todo {
    id: ID!
    done: Boolean!
    text: String!
  }
  type Query {
    getTodos: [Todo]!
  }
  type Mutation {
    addTodo(text: String!): Todo
    setDone(id: ID!, done: Boolean!): Todo
    deleteTodo(id: ID!): Todo
  }
  type Subscription {
    todos: [Todo]!
  }
`;

export default typeDefs