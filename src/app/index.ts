import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import express from "express";

export async function initServer() {
  const app = express();

  app.use(bodyParser.json());
  
  const graphqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            sayHello: String
        }
    `,
    resolvers: {
        Query:{
            sayHello: ()=> 'Hello to Graphql Server'
        }
    },
  });
  await graphqlServer.start();
  app.use("/graphql", express.json(), expressMiddleware(graphqlServer));
  
  return app;
}

