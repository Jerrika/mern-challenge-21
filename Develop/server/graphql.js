const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const { typeDefs, resolvers } = require('./schemas');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ token: req.headers.authorization })
});

server.applyMiddleware({ app });

app.listen({ port: 3001 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);
