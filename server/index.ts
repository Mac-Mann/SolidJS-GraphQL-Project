import { GraphQLServer } from "graphql-yoga";
import typeDefs from './typeDefs';
import { resolvers, pubsub } from "./resolvers";

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { pubsub },
});

server.start(() => console.log("Server is running on http://localhost:4000"));
